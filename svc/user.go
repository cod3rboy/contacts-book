package svc

import (
	"context"

	"github.com/cod3rboy/contacts-book/app"
	pb "github.com/cod3rboy/contacts-book/gen/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// Compile time verification of interface implementation
var _ pb.UserServer = (*userService)(nil)

type userService struct {
	app *app.Application
	pb.UnimplementedUserServer
}

func (s *userService) Register(ctx context.Context, account *pb.Account) (*emptypb.Empty, error) {
	return nil, nil
}

func (s *userService) Profile(ctx context.Context, xstoken *pb.AccessToken) (*pb.Profile, error) {
	return nil, nil
}
