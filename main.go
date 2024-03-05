package main

import (
	"github.com/cod3rboy/contacts-book/app"
	"github.com/cod3rboy/contacts-book/intercept"
	"github.com/cod3rboy/contacts-book/svc"
	"google.golang.org/grpc"
)

func main() {
	app := app.NewApplication()
	defer app.Cleanup()
	server := grpc.NewServer(intercept.RPCInterceptors(app)...)
	app.SetServer(server)
	app.MigrateSchema()
	svc.RegisterServices(app)
	app.Start()
}
