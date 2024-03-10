const grpc = require("@grpc/grpc-js");
const grpcAddress = require("./config.js");
const UserClient = require("../gen/proto/user_grpc_pb.js").UserClient;
const { Account, Gender } = require("../gen/proto/user_pb.js");
const google_protobuf_empty_pb = require("google-protobuf/google/protobuf/Empty_pb.js");

const client = new UserClient(grpcAddress, grpc.credentials.createInsecure());

async function register({
  fullName = "",
  gender = "",
  emailId = "",
  mobileNumber = "",
  password = "",
}) {
  return new Promise((resolve, reject) => {
    switch (gender) {
      case "male":
        gender = Gender.MALE;
        break;
      case "female":
        gender = Gender.FEMALE;
        break;
      default:
        gender = Gender.UNSPECIFIED;
    }

    const account = new Account();
    account.setFullName(fullName);
    account.setGender(gender);
    account.setEmailId(emailId);
    account.setMobileNumber(mobileNumber);
    account.setPassword(password);

    client.register(account, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function profile(jwt) {
  return new Promise((resolve, reject) => {
    const meta = new grpc.Metadata();
    meta.add("Authorization", "Bearer " + jwt);
    client.profile(
      new google_protobuf_empty_pb.Empty(),
      meta,
      (error, response) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(response.toObject());
      }
    );
  });
}

module.exports = {
  register,
  profile,
};
