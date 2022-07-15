import nodemailer from "nodemailer";
import mailjetTransport from "nodemailer-mailjet-transport";
import ejs from "ejs";

export default function sendEmail({
  from = "",
  to = "",
  subject = "",
  tmp = "",
  params = {},
}) {
  params = {
    ...params, public: process.env.URL_PUBLIC
  }
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
    mailer = nodemailer.createTransport(mailjetTransport({
      auth: {
        apiKey: '1dfa3417f68ec7fdc28c28e6d70db496',
        apiSecret: '311ddff8163eb793bdc6db37f8c2c865'
      }
    }));
  }

  return ejs.renderFile(process.cwd() + "/app/templates/" + tmp, params, function (err, data) {
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
