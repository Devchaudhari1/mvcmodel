require('dotenv').config();
const nodemailer= require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth :{
        user:process.env.emailLocation,
        pass: process.env.appPassword,
    },
});
const mailOptions={
    from:process.env.email,
    to : "devchaudhari404@gmail.com", 
    subject :"Mail Check",
    text :"First mail transfer successful",
};
const mailing =()=>{transporter.sendMail(mailOptions,(error , info)=>{
    if(error)
    {
        return console.log("Cannot send mail",error);
    }
    else
    return console.log("Info: ",info.messageId);
}); }
module.exports={  mailing };