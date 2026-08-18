import { configDotenv } from "dotenv"
import { env } from "process"

configDotenv()

const config = {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  DATABASE_URL: env.DATABASE_URL,
  JWT_REFRESH_SECRET: env.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET: env.JWT_ACCESS_SECRET,
  STRIPE_SECRET: env.STRIPE_SECRET,
  STRIPE_WEBHOOK: env.STRIPE_WEBHOOK
}

export default config
