import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT,
  db_url: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET_TOKEN,
  bcrypt_salt: process.env.BCRYPT_SALT,
}
