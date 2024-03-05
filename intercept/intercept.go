package intercept

import (
	"github.com/cod3rboy/contacts-book/app"
	"google.golang.org/grpc"
)

func RPCInterceptors(app *app.Application) []grpc.ServerOption {
	interceptors := []grpc.ServerOption{
		grpc.UnaryInterceptor(AuthInterceptor(app)),
	}
	return interceptors
}

type ContextKey string
