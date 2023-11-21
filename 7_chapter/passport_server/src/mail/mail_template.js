const mailer = require("nodemailer");

const goodbye = require("./goodbye_template");
const welcome = require("./welcome_template");

const { EMAIL_PASSWORD } = process.env;

const getEmailData = (to, name, template) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = { from: "이성현 <marvel97@naver.com", to, subject: `Hello ${name}`, html: welcome() };
      break;
    case "goodbye":
      data = { from: "이성현 <marvel97@naver.com>", to, subject: `Goodbye ${name}`, html: goodbye() };
      break;
    default:
      data;
  }

  return data;
};

const sendMail = (to, name, type) => {
  const transporter = mailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 465,
    auth: { user: "marvel97@naver.com", pass: EMAIL_PASSWORD },
  });

  const mail = getEmailData(to, name, type);

  transporter.sendMail(mail, (error, response) => {
    if (error) console.log(error);
    else console.log("email sent succuessfully");

    transporter.close();
  });
};

module.exports = sendMail;
