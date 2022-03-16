import nodemailer from "nodemailer";

export default function sendEmail({
  from = "",
  to = "",
  subject = "",
  text = "",
}) {
  if (!from) from = process.env.MAILER_FROM;
  if (!to) to = process.env.MAILER_TO;

  if (!from || !to || !subject || !text) {
    return false;
  }

  let mailer;
  if (process.env.NODE_ENV === "development") {
    mailer = nodemailer.createTransport({
      port: 1025,
    });
  } else {
    mailer = nodemailer.createTransport({
      SES: new AWS.SES(),
    });
  }

  const mailOptions = { from, to, subject, text };

  mailer
    .sendMail(mailOptions)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return false;
    });
}
