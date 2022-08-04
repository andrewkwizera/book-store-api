require("dotenv").config();

let config 
// console.log(process.env);
switch (process.env.NODE_ENV) {
    case 'production':
        config = {
            port: process.env.PORT || 3000,
            mongoUri:process.env.MONGO_URI, 
            env:  process.env.NODE_ENV, 
            smtpHost: process.env.SMTP_HOST, 
            smtpPort: process.env.SMTP_PORT, 
            smtpUser: process.env.SMTP_USER,
            smtpPass: process.env.SMTP_PASS


        }
    case 'development':
        config = {
            port: 5000, 
            mongoUri: 'mongodb://localhost:27017/test', 
            env:  process.env.NODE_ENV,
            smtpHost: process.env.SMTP_HOST, 
            smtpPort: process.env.SMTP_PORT, 
            smtpUser: process.env.SMTP_USER,
            smtpPass: process.env.SMTP_PASS
        }
    default:
        config = {
            port: 5000, 
            mongoUri: 'mongodb://localhost:27017/test',
            env:  process.env.NODE_ENV, 
            smtpHost: process.env.SMTP_HOST, 
            smtpPort: process.env.SMTP_PORT, 
            smtpUser: process.env.SMTP_USER,
            smtpPass: process.env.SMTP_PASS

        }
}

module.exports = Object.freeze(config)