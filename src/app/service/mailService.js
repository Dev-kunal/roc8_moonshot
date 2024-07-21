const nodemailer = require("nodemailer");
export async function sendMail(
  subject = "Verificaiton email for E-commerce",
  toEmail,
  otp
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: "",
    html: `<p>Here'e your email verification code <b>${otp}</b></p>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Email Sent");
        resolve(true);
      }
    });
  });
}
