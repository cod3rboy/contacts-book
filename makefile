proto-win:
	pwsh proto-generate.ps1
proto:
	./proto-generate.sh
schema:
	go generate ./ent