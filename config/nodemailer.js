const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.gmailid,
    pass: process.env.gmailpass,
  },
});

let mailOptions = {
  from: "myemail@gmail.com",
  to: "myemail@gmail.com",
  subject: "myemail@gmail.com",
  text: "myemail@gmail.com",
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log("Error");
  } else {
    console.log("DONE");
  }
});
