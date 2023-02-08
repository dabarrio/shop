import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    db: {
      TYPE: process.env.DB_TYPE,
      HOST: process.env.DB_HOST,
      PORT: parseInt(process.env.DB_PORT, 10),
      USER: process.env.DB_USER,
      PASSWORD: process.env.DB_PASSWORD,
      NAME: process.env.DB_NAME
    },
    API_KEY: process.env.API_KEY
  };
});
