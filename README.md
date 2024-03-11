# Contacts Book Application

## Architecture

This application has three modules -

1. gRPC Backend
2. JSON API Backend (`json-api` directory)
3. React Frontend (`react-ui` directory)

Request and the response flows are as follows:

- **Request:** React Frontend -> JSON API Backend -> gRPC Backend
- **Response:** gRPC Backend -> JSON API Backend -> React Frontend

## Install Dependencies

- Install yarn - `npm install --global yarn`
- Install `protoc` compiler.
- GRPC tools npm package: `npm install --global grpc-tools`
- Install `protoc` js plugin npm package: `npm install --global protoc-gen-js-grpc`

## Code Generation

These commands generate gRPC client stub and server stub from proto files.

- Windows: `make proto-win`

- Linux/Mac: `make proto-lin`

## Running Application

Run all three modules in the following sequence -

### gRPC Backend

`go run main.go`

### JSON API Backend

- `cd json-api`
- `cp .env.example .env`
- `yarn dev`

### React Frontend

- `cd react-ui`
- `cp .env.example .env`
- `yarn dev`
