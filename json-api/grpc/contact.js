const grpc = require("@grpc/grpc-js");
const grpcAddress = require("./config.js");
const ContactClient = require("../gen/proto/contact_grpc_pb.js").ContactClient;

const client = new ContactClient(
  grpcAddress,
  grpc.credentials.createInsecure()
);
