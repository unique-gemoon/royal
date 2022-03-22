import nodemailer from "nodemailer";
import AWS from "aws-sdk";
import ejs from "ejs";

export default function sendEmail({
  from = "",
  to = "",
  subject = "",
  tmp = "",
  params = {},
}) {
  if (!from) from = process.env.MAILER_ADMIN;
  if (!to) to = process.env.MAILER_ADMIN;

  if (!from || !to || !subject || !tmp) {
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

  return ejs.renderFile( process.cwd() + "/app/templates/" + tmp, params, function (err, data) {
    if (err) {
      console.log(err);
      return false;
    } else {
      const mainOptions = {
        from,
        to,
        subject,
        html: data,
      };
      return mailer
        .sendMail(mainOptions)
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
  });
}
