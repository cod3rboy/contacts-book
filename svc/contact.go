package svc

import (
	"context"
	"log"
	"strings"

	"entgo.io/ent/dialect/sql"
	"github.com/cod3rboy/contacts-book/app"
	"github.com/cod3rboy/contacts-book/ent"
	"github.com/cod3rboy/contacts-book/ent/contact"
	"github.com/cod3rboy/contacts-book/ent/schema"
	pb "github.com/cod3rboy/contacts-book/gen/proto"
	"github.com/cod3rboy/contacts-book/intercept/key"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

// compile time verification of interface implementation
var _ pb.ContactServer = (*contactService)(nil)

type contactService struct {
	app *app.Application
	pb.UnimplementedContactServer
}

func (s *contactService) Create(ctx context.Context, details *pb.Details) (*pb.RecordID, error) {
	authUser, ok := ctx.Value(key.AuthUserContextKey).(*ent.User)
	if !ok {
		log.Printf("failed to get authenticated user from context: %v", ctx.Value(key.AuthUserContextKey))
		return nil, status.Error(codes.Internal, "internal error")
	}
	contactGender := contact.Gender(strings.ToLower(details.GetGender().String()))
	err := contact.GenderValidator(contactGender)
	if err != nil {
		log.Printf("invalid gender: %v", details.GetGender())
		return nil, status.Error(codes.InvalidArgument, "invalid gender specified")
	}

	tx, err := s.app.Db.Tx(ctx)
	if err != nil {
		log.Printf("failed to create db transaction: %v", err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	newContact, err := tx.Contact.Create().
		SetFirstName(details.GetFirstName()).
		SetLastName(details.GetLastName()).
		SetGender(contactGender).
		SetEmail(details.GetEmail()).
		SetMobileNumber(details.GetMobileNumber()).
		SetAddress(&schema.Address{
			Street:        details.GetAddress().GetStreet(),
			Area:          details.GetAddress().GetArea(),
			City:          details.GetAddress().GetCity(),
			ProvinceState: details.GetAddress().GetProvinceState(),
			Country:       details.GetAddress().GetCountry(),
			PinCode:       details.GetAddress().GetPincode(),
		}).Save(ctx)
	if err != nil {
		tx.Rollback()
		log.Printf("failed to create new contact: %v", err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	_, err = tx.User.UpdateOne(authUser).AddContacts(newContact).Save(ctx)
	if err != nil {
		tx.Rollback()
		log.Printf("failed to link contact with owner: %v", err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	tx.Commit()

	return &pb.RecordID{
		Id: int64(newContact.ID),
	}, nil
}

func (s *contactService) Get(ctx context.Context, id *pb.RecordID) (*pb.Record, error) {
	authUser, ok := ctx.Value(key.AuthUserContextKey).(*ent.User)
	if !ok {
		log.Printf("failed to get authenticated user from context: %v", ctx.Value(key.AuthUserContextKey))
		return nil, status.Error(codes.Internal, "internal error")
	}

	userContact, err := authUser.QueryContacts().
		Where(contact.ID(int(id.Id))).
		First(ctx)

	if ent.IsNotFound(err) {
		return nil, status.Error(codes.NotFound, "contact not found")
	} else if err != nil {
		log.Printf("failed to find contact for user %s and id %d: %v", authUser.EmailID, id.Id, err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	return convertToProtoContact(userContact), nil
}

func (s *contactService) GetAll(ctx context.Context, _ *emptypb.Empty) (*pb.List, error) {
	authUser, ok := ctx.Value(key.AuthUserContextKey).(*ent.User)
	if !ok {
		log.Printf("failed to get authenticated user from context: %v", ctx.Value(key.AuthUserContextKey))
		return nil, status.Error(codes.Internal, "internal error")
	}

	userContacts, err := authUser.QueryContacts().Order(contact.ByID(sql.OrderDesc())).All(ctx)
	if err != nil {
		log.Printf("failed to list contacts for user %s : %v", authUser.EmailID, err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	contactRecords := make([]*pb.Record, 0, len(userContacts))
	for _, userContact := range userContacts {
		contactRecords = append(contactRecords, convertToProtoContact(userContact))
	}

	return &pb.List{Records: contactRecords}, nil
}

func (s *contactService) Update(ctx context.Context, data *pb.RecordUpdate) (*pb.Record, error) {
	authUser, ok := ctx.Value(key.AuthUserContextKey).(*ent.User)
	if !ok {
		log.Printf("failed to get authenticated user from context: %v", ctx.Value(key.AuthUserContextKey))
		return nil, status.Error(codes.Internal, "internal error")
	}

	contactId := data.GetId()

	userContact, err := authUser.QueryContacts().
		Where(contact.ID(int(contactId))).
		First(ctx)

	if ent.IsNotFound(err) {
		return nil, status.Error(codes.NotFound, "contact not found")
	} else if err != nil {
		log.Printf("failed to find contact for user %s and id %d: %v", authUser.EmailID, data.Id, err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	values := data.GetValues()
	update := userContact.Update()
	if firstName, ok := values["first_name"]; ok {
		update.SetFirstName(firstName)
	}
	if lastName, ok := values["last_name"]; ok {
		update.SetLastName(lastName)
	}
	if gender, ok := values["gender"]; ok {
		contactGender := contact.Gender(strings.ToLower(gender))
		err := contact.GenderValidator(contactGender)
		if err != nil {
			log.Printf("invalid gender: %s", gender)
			return nil, status.Error(codes.InvalidArgument, "invalid gender specified")
		}
		update.SetGender(contactGender)
	}
	if email, ok := values["email"]; ok {
		update.SetEmail(email)
	}
	if mobileNumber, ok := values["mobile_number"]; ok {
		update.SetMobileNumber(mobileNumber)
	}
	userAddress := &schema.Address{
		Street:        userContact.Address.Street,
		Area:          userContact.Address.Area,
		City:          userContact.Address.City,
		ProvinceState: userContact.Address.ProvinceState,
		Country:       userContact.Address.Country,
		PinCode:       userContact.Address.PinCode,
	}
	if addressStreet, ok := values["address.street"]; ok {
		userAddress.Street = addressStreet
	}
	if addressArea, ok := values["address.area"]; ok {
		userAddress.Area = addressArea
	}
	if addressCity, ok := values["address.city"]; ok {
		userAddress.City = addressCity
	}
	if addressProvinceState, ok := values["address.province_state"]; ok {
		userAddress.ProvinceState = addressProvinceState
	}
	if addressCountry, ok := values["address.country"]; ok {
		userAddress.Country = addressCountry
	}
	if addressPincode, ok := values["address.pincode"]; ok {
		userAddress.PinCode = addressPincode
	}
	update.SetAddress(userAddress)

	userContact, err = update.Save(ctx)
	if err != nil {
		log.Printf("failed to update contact for user %s with id %d: %v", authUser.EmailID, contactId, err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	return convertToProtoContact(userContact), nil
}

func (s *contactService) Delete(ctx context.Context, id *pb.RecordID) (*emptypb.Empty, error) {
	authUser, ok := ctx.Value(key.AuthUserContextKey).(*ent.User)
	if !ok {
		log.Printf("failed to get authenticated user from context: %v", ctx.Value(key.AuthUserContextKey))
		return nil, status.Error(codes.Internal, "internal error")
	}

	userContact, err := authUser.QueryContacts().
		Where(contact.ID(int(id.Id))).
		First(ctx)

	if err == nil {
		err = s.app.Db.Contact.DeleteOne(userContact).Exec(ctx)
	}

	if err != nil {
		log.Printf("cannot find and delete contact for user %s and id %d: %v", authUser.EmailID, id.Id, err)
	}

	return &emptypb.Empty{}, nil
}

func convertToProtoContact(c *ent.Contact) *pb.Record {
	return &pb.Record{
		Id:           int64(c.ID),
		FirstName:    c.FirstName,
		LastName:     c.LastName,
		Gender:       convertToProtoGender(c.Gender.String()),
		Email:        c.Email,
		MobileNumber: c.MobileNumber,
		Address: &pb.Address{
			Street:        c.Address.Street,
			Area:          c.Address.Area,
			City:          c.Address.City,
			ProvinceState: c.Address.ProvinceState,
			Country:       c.Address.Country,
			Pincode:       c.Address.PinCode,
		},
	}
}
