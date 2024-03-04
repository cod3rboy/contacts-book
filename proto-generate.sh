mkdir gen
protoc --proto_path="." --go_out="./gen" --go-grpc_out="./gen" --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative proto/contact.proto
protoc --proto_path="." --go_out="./gen" --go-grpc_out="./gen" --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative proto/user.proto
protoc --proto_path="." --go_out="./gen" --go-grpc_out="./gen" --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative proto/auth.proto
