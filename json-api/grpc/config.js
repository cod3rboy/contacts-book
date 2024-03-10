const env = process.env.NODE_ENV || "dev"; // 'dev' or 'production'
const config = require("../config")[env];

module.exports = config.grpc.host + ":" + config.grpc.port;
