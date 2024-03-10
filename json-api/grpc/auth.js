const grpc = require("@grpc/grpc-js");
const grpcAddress = require("./config.js");
const AuthClient = require("../gen/proto/auth_grpc_pb.js").AuthClient;
const { Credentials, Token } = require("../gen/proto/auth_pb.js");

const client = new AuthClient(grpcAddress, grpc.credentials.createInsecure());

async function login({ emailId = "", password = "" }) {
  return new Promise((resolve, reject) => {
    if (!emailId || !password) {
      res.status(400).json({ msg: "invalid login credentials" });
      return;
    }
    const credentials = new Credentials();
    credentials.setEmailId(emailId);
    credentials.setPassword(password);
    client.login(credentials, (error, response) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(response.toObject());
    });
  });
}

async function logout(jwt = "") {
  return new Promise((resolve, reject) => {
    const token = new Token();
    token.setJwt(jwt);
    token.setExpiry(0);
    client.logout(token, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  login,
  logout,
};
