const config = require("../config/index");
const nodemailer = require("nodemailer");
const logger = require('../utils/logger')

const transport = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});


/**
 * 
 * @param {*} token 
 * @param {*} user 

 */

const sendUserActivationEmail = async (token, user) => {
  try {
    /** The link should be the corresponding page on the fromtend where a password is resetted
     * This way the frontend pulls the token from URL query  and makes an API with the token to activate
     * the users accounts. This applies for reseting passwords too.
     */
    const link = `localhost:5000/api/users/auth/activate?token=${token}`;
    const htmlBody = `
    <html>
        <body>
            <span>
               <p>Hello, ${user.firstname}</p>
               <p>Please active your account by clicking this link <a href=${link}>${link}</a></p>
               </span>
        </body>
    </html>`;
    const mailOptions = {
      from: "nodejs.solvit@gmail.com", // Sender address
      to: user.email, // List of recipients
      subject: "Activate your account", // Subject line,
      html: htmlBody,
    };
    transport.sendMail(mailOptions, (err, info) => {
        logger.info(`user activation email for ${user.email} sent`)
    } )
  } catch (e) {
    logger.error(`unable to send user activation email`, e)
  }
};

const sendUserPasswordResetEmail = async (token, user) => {
  try {
    const link = `localhost:5000/api/users/auth/reset?token=${token}`;
    const htmlBody = `
    <html>
        <body>
            <span>
               <p>Hello, ${user.firstname}</p>
               <p>Please reset your password by clicking this link <a href=${link}>${link}</a></p>
               </span>
        </body>
    </html>`;
    const mailOptions = {
      from: "nodejs.solvit@gmail.com", // Sender address
      to: user.email, // List of recipients
      subject: "Rsest your Password", // Subject line,
      html: htmlBody,
    };
    transport.sendMail(mailOptions, (err, info) => {
        logger.info(`passowrd reset email  for ${user.email} sent`)
    } )
  } catch (e) {
    logger.error(`unable to send user password reset email`, e)
  }
};


module.exports = {
  sendUserActivationEmail,
  sendUserPasswordResetEmail
};
