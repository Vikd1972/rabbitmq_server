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
  db: {
    port: +joinedEnv.DB_PORT,
    host: joinedEnv.HOST,
    user: joinedEnv.DB_USERNAME,
    base: joinedEnv.DB_BASENAME,
    pass: joinedEnv.DB_PASS,
  },
  token: {
    salt: joinedEnv.PASSWORD_SALT,
    secretWord: joinedEnv.SECRET_WORD,
  },
};

export default config;
