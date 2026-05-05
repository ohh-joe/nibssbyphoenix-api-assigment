const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email, token) => {
  const url = `https://nibssbyphoenix-api-assigment.onrender.com/api/auth/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your account",
    html: `
      <h3>Click below to verify</h3>
      <a href="${url}">Verify Account</a>
    `
  });
};

module.exports = sendVerificationEmail;