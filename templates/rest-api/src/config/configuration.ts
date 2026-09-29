



export default () => ({
    app: {
        port: Number(process.env.PORT),
        nodeEnv: process.env.NODE_ENV,
    },
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
})