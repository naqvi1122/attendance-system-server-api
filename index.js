const express = require("express");
const db = require("./database/db.js");
const nodemailer = require("nodemailer");
const Nexmo  = require("nexmo");
const twilio = require("twilio");
const { router } = require('./routes/projectroutes');
//require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);
//app.use("/public", express.static("public"));


//email send to user email

// const email = {
//     from: "ahadshah925@yahoo.com",
//     to: "mustahibnaqvi@gmail.com",
//     subject: "Verify Your Email",
//     text: "Please click on the following link to verify your email address: https://www.example.com/verify?token=1234567890",
//   };
  
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mail.yahoo.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "ahadshah925@yahoo.com",
//       pass: "sqgcthdgnowdspme",
//     },
//     //authMethod: "PLAIN" // Add this line
//   });
  
//   transporter.sendMail(email, (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Email sent successfully!");
//     }
//   });


// const accountSid = 'ACa4e46773d5dbf90cf2a71e056b4b965d';
// const authToken = '00784ddb542806c4ca83e3748568e972';

// const twilioClient = twilio(accountSid, authToken);

// twilioClient.messages.create({
//     body: 'twiloo code',
//     to: '3064000967',
//     from: '+18159989793', // Use your Twilio phone number
// })
// .then(message => {
//     console.log('SMS sent successfully:', message.sid);
//     res.json({ message: 'SMS sent successfully' });
// })
// .catch(error => {
//     console.error('Error sending SMS:', error);
//     //res.status(500).json({ error: 'Failed to send SMS' });
// });







app.listen(8080, () => console.log("server1 is runing on port 8080"));
