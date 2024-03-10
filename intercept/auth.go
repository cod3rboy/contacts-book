package intercept

import (
	"context"
	"log"
	"strings"

	"github.com/cod3rboy/contacts-book/app"
	"github.com/cod3rboy/contacts-book/ent/user"
	"github.com/cod3rboy/contacts-book/intercept/key"
	"github.com/cod3rboy/contacts-book/svc"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

func AuthInterceptor(application *app.Application) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req any, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp any, err error) {
		switch info.FullMethod {
		case "/auth.Auth/Login":
			fallthrough
		case "/auth.Auth/Logout":
			fallthrough
		case "/user.User/Register":
			// Public RPC methods
			// DO NOTHING
		default:
			// Protected RPC methods
			// VERIFY ACCESS TOKEN
			md, ok := metadata.FromIncomingContext(ctx)
			if !ok {
				return nil, status.Error(codes.Unauthenticated, "access denied")
			}
			authorization := md.Get("Authorization")
			if len(authorization) == 0 {
				return nil, status.Error(codes.Unauthenticated, "access denied")
			}
			bearerToken := authorization[0]
			if !ok || !strings.HasPrefix(bearerToken, "Bearer ") {
				return nil, status.Error(codes.Unauthenticated, "access denied")
			}
			jwtToken := strings.SplitN(bearerToken, " ", 2)[1]
			_, found := application.Cache.Get(jwtToken)
			if !found {
				return nil, status.Error(codes.Unauthenticated, "access denied")
			}
			email, verified := svc.VerifyToken(jwtToken)
			if !verified {
				return nil, status.Error(codes.Unauthenticated, "access denied")
			}
			authUser, err := application.Db.User.Query().
				Where(user.EmailID(email)).
				First(ctx)
			if err != nil {
				log.Printf("failed to find authenticated user: %s", email)
				return nil, status.Error(codes.Internal, "internal error")
			}
			ctx = context.WithValue(ctx, key.AuthUserContextKey, authUser)
		}
		return handler(ctx, req)
	}
}
