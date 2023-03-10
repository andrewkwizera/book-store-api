require("dotenv").config();

let config 

switch (process.env.NODE_ENV) {
    case 'production':
        config = {
            port: process.env.PORT || 3000,
            mongoUri:process.env.MONGO_URI, 
            env:  process.env.NODE_ENV, 
            smtpHost: process.env.SMTP_HOST, 
            smtpPort: process.env.SMTP_PORT, 
            smtpUser: process.env.MAILJET_API_KEY,
            smtpPass: process.env.MAILJET_API_SECRET,
            host: `${process.env.HOST}:${this.port}`,
            sessionSecret: process.env.SESSION_SECRET 

        }
    case 'development':
        config = {
            port: 5000, 
            mongoUri: process.env.MONGO_URI, 
            env:  process.env.NODE_ENV,
            smtpHost: process.env.SMTP_HOST, 
            smtpPort: process.env.SMTP_PORT, 
            smtpUser: process.env.MAILJET_API_KEY,
            smtpPass: process.env.MAILJET_API_SECRET,
            host: `http://localhost:${this.port}`,
            sessionSecret: process.env.SESSION_SECRET
        }
    default:
        config = {
            port: 5000, 
            mongoUri: process.env.MONGO_URI,
            env:  process.env.NODE_ENV, 
            smtpHost: process.env.SMTP_HOST, 
            smtpPort: process.env.SMTP_PORT, 
            smtpUser: process.env.MAILJET_API_KEY,
            smtpPass: process.env.MAILJET_API_SECRET,
            host: `http://localhost:${this.port}`,
            sessionSecret: process.env.SESSION_SECRET

        }
}

module.exports = Object.freeze(config)