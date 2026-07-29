import Rollbar from "rollbar";

const baseConfig = {
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV,
};

export const clientConfig = {
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_CHAOBAO_STORE_CLIENT_TOKEN_1785063581,
  ...baseConfig,
};

export const serverInstance = new Rollbar({
  accessToken: process.env.ROLLBAR_CHAOBAO_STORE_SERVER_TOKEN_1785063581,
  ...baseConfig,
});
