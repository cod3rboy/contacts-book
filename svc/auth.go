package svc

import (
	"context"
	"log"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/cod3rboy/contacts-book/app"
	"github.com/cod3rboy/contacts-book/ent"
	"github.com/cod3rboy/contacts-book/ent/user"
	pb "github.com/cod3rboy/contacts-book/gen/proto"
	"github.com/golang-jwt/jwt/v5"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
)

// compile time verification of interface implementation
var _ pb.AuthServer = (*authService)(nil)

type authService struct {
	app *app.Application
	pb.UnimplementedAuthServer
}

func (s *authService) Login(ctx context.Context, credentials *pb.Credentials) (*pb.AccessGrant, error) {
	email, password := credentials.EmailId, credentials.Password
	user, err := s.app.Db.User.Query().Where(user.EmailID(email)).First(ctx)

	if ent.IsNotFound(err) {
		return nil, status.Error(codes.Unauthenticated, "invalid credentials")
	} else if err != nil {
		log.Printf("login error: %v", err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	if !matchPasswordHash(password, user.PasswordHash) {
		return nil, status.Error(codes.Unauthenticated, "invalid credentials")
	}

	token, expiry, err := GenerateToken(user.FullName, user.EmailID)
	if err != nil {
		log.Printf("error generating jwt: %v", err)
		return nil, status.Error(codes.Internal, "internal error")
	}

	s.app.Cache.Set(token, true, time.Until(time.UnixMilli(expiry)))

	grant := &pb.AccessGrant{
		User: &pb.User{
			Name:  user.FullName,
			Email: user.EmailID,
		},
		Token: &pb.Token{
			Jwt:    token,
			Expiry: expiry,
		},
	}

	return grant, nil
}

func (s *authService) Logout(ctx context.Context, token *pb.Token) (*emptypb.Empty, error) {
	jwtToken := token.Jwt
	if _, found := s.app.Cache.Get(jwtToken); found {
		s.app.Cache.Delete(jwtToken)
	}
	return &emptypb.Empty{}, nil
}

func hashPassword(password string) (hash string, err error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	hash = string(bytes)
	return
}

func matchPasswordHash(password string, passwordHash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password)) == nil
}

func GenerateToken(name, email string) (string, int64, error) {
	expiry := time.Now().Add(1 * time.Hour)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"name":  name,
		"email": email,
		"exp":   expiry.UnixMilli(),
	})
	signedToken, err := token.SignedString([]byte(app.JWT_SIGNING_TOKEN))
	if err != nil {
		return "", 0, err
	}
	return signedToken, expiry.UnixMilli(), err
}
