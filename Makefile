proto-win:
	pwsh proto-generate.ps1
proto-lin:
	bash proto-generate.sh
schema:
	go generate ./ent
run-server:
	go run main.go
