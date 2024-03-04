package main

import (
	"github.com/cod3rboy/contacts-book/app"
	"github.com/cod3rboy/contacts-book/svc"
)

func main() {
	app := app.NewApplication()
	app.MigrateSchema()
	svc.RegisterServices(app)
	app.Start()
	defer app.Cleanup()
}
