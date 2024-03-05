package app

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"time"

	"github.com/cod3rboy/contacts-book/ent"
	_ "github.com/mattn/go-sqlite3"
	"github.com/patrickmn/go-cache"
	"google.golang.org/grpc"
)

// TODO: Retrieve values from configuration
const SQLITE_DB_PATH = "./db/contracts-book.db"
const PORT_GRPC_SERVER = 8083
const JWT_SIGNING_TOKEN = "abcdefghijklmnop"

type Application struct {
	Db     *ent.Client
	Server *grpc.Server
	Cache  *cache.Cache
}

func NewApplication() *Application {
	return &Application{
		Db:    createDbClient(),
		Cache: cache.New(5*time.Minute, 10*time.Minute),
	}
}

func (app *Application) SetServer(server *grpc.Server) {
	app.Server = server
}

func (app *Application) Start() {
	if app.Server == nil {
		log.Fatal("application server was not set. did you call SetServer?")
	}
	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", PORT_GRPC_SERVER))
	if err != nil {
		log.Fatalf("failed to listen on address :%d", PORT_GRPC_SERVER)
	}
	log.Printf("starting grpc server at address :%d", PORT_GRPC_SERVER)

	if err := app.Server.Serve(listener); err != nil {
		log.Fatalf("failed to start grpc server: %v", err)
	}
}

func (app *Application) Cleanup() {
	app.Db.Close()
	app.Cache.Flush()
}

func (app *Application) MigrateSchema() {
	if err := app.Db.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}
}

func createDbClient() *ent.Client {
	os.Mkdir("db", 0755)
	client, err := ent.Open("sqlite3", fmt.Sprintf("file:%s?cache=shared&_fk=1", SQLITE_DB_PATH))
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}
	return client
}
