package svc

import (
	"context"

	"github.com/cod3rboy/contacts-book/app"
	pb "github.com/cod3rboy/contacts-book/gen/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// compile time verification of interface implementation
var _ pb.ContactServer = (*contactService)(nil)

type contactService struct {
	app *app.Application
	pb.UnimplementedContactServer
}

func (s *contactService) Create(ctx context.Context, details *pb.Details) (*pb.RecordID, error) {
	return nil, nil
}

func (s *contactService) Get(ctx context.Context, id *pb.RecordID) (*pb.Record, error) {
	return nil, nil
}

func (s *contactService) GetAll(ctx context.Context, _ *emptypb.Empty) (*pb.List, error) {
	return nil, nil
}

func (s *contactService) Update(ctx context.Context, data *pb.RecordUpdate) (*pb.Record, error) {
	return nil, nil
}

func (s *contactService) Delete(ctx context.Context, id *pb.RecordID) (*emptypb.Empty, error) {
	return nil, nil
}
