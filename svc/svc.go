package svc

import (
	"github.com/cod3rboy/contacts-book/app"
	pb "github.com/cod3rboy/contacts-book/gen/proto"
)

func RegisterServices(application *app.Application) {
	pb.RegisterUserServer(application.Server, &userService{app: application})
	pb.RegisterAuthServer(application.Server, &authService{app: application})
	pb.RegisterContactServer(application.Server, &contactService{app: application})
}
