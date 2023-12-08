require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "micahmclain.github.io",
  })
);
app.use(express.static("docs"));
app.use(express.json());

app.get("/", (req, res) => {
  const filePath = __dirname + "/docs/index.html";
  console.log("Attempting to serve:", filePath);
  res.sendFile(filePath);
});

app.post("/test", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "mclainmicah1@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message + req.body.phoneNum,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
