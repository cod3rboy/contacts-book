package svc

import (
	"context"

	"github.com/cod3rboy/contacts-book/app"
	pb "github.com/cod3rboy/contacts-book/gen/proto"
	"google.golang.org/protobuf/types/known/emptypb"
)

// compile time verification of interface implementation
var _ pb.AuthServer = (*authService)(nil)

type authService struct {
	app *app.Application
	pb.UnimplementedAuthServer
}

func (s *authService) Login(ctx context.Context, credentials *pb.Credentials) (*pb.AccessGrant, error) {
	return nil, nil
}

func (s *authService) Logout(ctx context.Context, token *pb.Token) (*emptypb.Empty, error) {
	return nil, nil
}
