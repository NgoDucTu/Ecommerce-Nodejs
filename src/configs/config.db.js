"use strict";

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDEV",
  },
};

const stag = {
  app: {
    port: process.env.STG_APP_PORT || 3055,
  },
  db: {
    host: process.env.STG_DB_HOST || "localhost",
    port: process.env.STG_DB_PORT || 27017,
    name: process.env.STG_DB_NAME || "shopSTG",
  },
};

const prod = {
  app: {
    port: process.env.PRO_APP_PORT || 3055,
  },
  db: {
    host: process.env.PRO_DB_HOST || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "shopPRO",
  },
};

const config = { dev, stag, prod };

const env = process.env.NODE_ENV || "dev";

export default config[env];
