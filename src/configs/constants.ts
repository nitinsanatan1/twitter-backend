export const Configs = {
    mongo: {
        host: process.env.MONGODB_HOST || "",
        db: process.env.MONGODB_NAME || "",
      },
    auth: {
      jwtSecret: process.env.JWT_SECRET || ""
    }
}