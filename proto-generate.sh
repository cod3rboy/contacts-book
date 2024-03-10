mkdir gen
protoc --proto_path="." --go_out="./gen" --go-grpc_out="./gen" --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative proto/contact.proto
protoc --proto_path="." --go_out="./gen" --go-grpc_out="./gen" --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative proto/user.proto
protoc --proto_path="." --go_out="./gen" --go-grpc_out="./gen" --go_opt=paths=source_relative --go-grpc_opt=paths=source_relative proto/auth.proto
mkdir json-api/gen
grpc_tools_node_protoc --proto_path="." --js_out="import_style=commonjs,binary:./json-api/gen" --grpc_out="generate_package_definition:./json-api/gen" proto/auth.proto
grpc_tools_node_protoc --proto_path="." --js_out="import_style=commonjs,binary:./json-api/gen" --grpc_out="generate_package_definition:./json-api/gen" proto/user.proto
grpc_tools_node_protoc --proto_path="." --js_out="import_style=commonjs,binary:./json-api/gen" --grpc_out="generate_package_definition:./json-api/gen" proto/contact.proto
