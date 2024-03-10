package svc

import (
	"context"
	"log"
	"strings"

	"github.com/cod3rboy/contacts-book/app"
	"github.com/cod3rboy/contacts-book/ent"
	"github.com/cod3rboy/contacts-book/ent/user"
	pb "github.com/cod3rboy/contacts-book/gen/proto"
	"github.com/cod3rboy/contacts-book/intercept/key"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

// Compile time verification of interface implementation
var _ pb.UserServer = (*userService)(nil)

type userService struct {
	app *app.Application
	pb.UnimplementedUserServer
}

func (s *userService) Register(ctx context.Context, account *pb.Account) (*emptypb.Empty, error) {
	userGender := user.Gender(strings.ToLower(account.GetGender().String()))
	err := user.GenderValidator(userGender)
	if err != nil {
		log.Printf("invalid gender: %v", account.GetGender())
		return nil, status.Error(codes.InvalidArgument, "invalid gender specified")
	}

	pwdHash, err := hashPassword(account.GetPassword())
	if err != nil {
		log.Printf("failed to hash password: %v", err)
		return nil, status.Error(codes.Internal, "internal error")
	}
	_, err = s.app.Db.User.
		Create().
		SetFullName(account.FullName).
		SetGender(userGender).
		SetEmailID(account.GetEmailId()).
		SetMobileNumber(account.GetMobileNumber()).
		SetPasswordHash(pwdHash).
		Save(ctx)
	if err != nil {
		log.Printf("failed to create user: %v", err)
		return nil, status.Error(codes.Internal, "failed to create user")
	}
	return &emptypb.Empty{}, nil
}

func (s *userService) Profile(ctx context.Context, _ *emptypb.Empty) (*pb.Profile, error) {
	authUser, ok := ctx.Value(key.AuthUserContextKey).(*ent.User)
	if !ok {
		log.Printf("failed to get authenticated user from context: %v", ctx.Value(key.AuthUserContextKey))
		return nil, status.Error(codes.Internal, "internal error")
	}

	profile := &pb.Profile{
		FullName:     authUser.FullName,
		Gender:       convertToProtoGender(authUser.Gender.String()),
		EmailId:      authUser.EmailID,
		MobileNumber: authUser.MobileNumber,
	}

	return profile, nil
}

func convertToProtoGender(gender string) pb.Gender {
	switch gender {
	case "male":
		return pb.Gender_MALE
	case "female":
		return pb.Gender_FEMALE
	}
	return pb.Gender_UNSPECIFIED
}
