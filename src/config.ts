import dotenv from 'dotenv';
import path from 'path';

const localEnv = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultEnv = dotenv.config({ path: path.normalize(`${__dirname}../default.env`) }).parsed;

const joinedEnv = {
  ...defaultEnv,
  ...localEnv,
};

const config = {
  port: +joinedEnv.SERVER_PORT,
  path: joinedEnv.LOCAL_PATH,
  pathToImage: joinedEnv.PATH_TO_IMAGE,
  pathToCover: joinedEnv.PATH_TO_COVER,
  rabbitExchange: joinedEnv.RABBIT_EXCHANGE,
  rabbitHost: joinedEnv.RABBIT_HOST,
  db: {
    port: +joinedEnv.POSTGRES_DB_PORT,
    host: joinedEnv.POSTGRES_DB_HOST,
    user: joinedEnv.POSTGRES_DB_USER,
    base: joinedEnv.POSTGRES_DB_NAME,
    password: joinedEnv.POSTGRES_DB_PASSWORD,
    logging: Boolean(joinedEnv.POSTGRES_DB_LOGGING),
  },
  token: {
    salt: joinedEnv.PASSWORD_SALT,
    secretWord: joinedEnv.SECRET_WORD,
  },
};

export default config;
