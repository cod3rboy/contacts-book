// config.js

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000,
  },
  grpc: {
    host: process.env.DEV_GRPC_HOST || "localhost",
    port: parseInt(process.env.DEV_GRPC_PORT) || 8083,
  },
};
const production = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT) || 3000,
  },
  grpc: {
    host: process.env.PROD_GRPC_HOST || "localhost",
    port: parseInt(process.env.PROD_GRPC_PORT) || 8083,
  },
};

const config = {
  dev,
  production,
};

module.exports = config;
