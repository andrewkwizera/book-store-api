const config = require("../config/index");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});

const sendUserActivationEmail = async (token, user) => {
  try {
    const link = `localhost:5000/api/users/auth/activate?token=${token}`;
    const htmlBody = `
    <html>
        <body>
            <span>
               <p>Hello,</p>
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
        // console.log(info)
    } )
  } catch (e) {}
};

module.exports = {
  sendUserActivationEmail,
};
