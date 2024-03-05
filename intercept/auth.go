package intercept

import (
	"context"
	"log"
	"strings"

	"github.com/cod3rboy/contacts-book/app"
	"github.com/cod3rboy/contacts-book/ent/user"
	"github.com/cod3rboy/contacts-book/svc"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func AuthInterceptor(application *app.Application) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req any, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp any, err error) {
		switch info.FullMethod {
		case "Login":
			fallthrough
		case "Logout":
			fallthrough
		case "Register":
			// Public RPC methods
			// DO NOTHING
		default:
			// Protected RPC methods
			// VERIFY ACCESS TOKEN
			bearerToken, ok := ctx.Value("authorization").(string)
			if !ok || !strings.HasPrefix(bearerToken, "bearer ") {
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
			var authUserKey ContextKey = "auth-user"
			ctx = context.WithValue(ctx, authUserKey, authUser)
		}
		return handler(ctx, req)
	}
}
