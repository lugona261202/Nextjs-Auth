//domain.com/verifytoken/assasasdfdgfdffg  preferable for server side
//domai.com/verifytoken?token=adadfdf  preferable for client side
import nodemailer from 'nodemailer'
import User from "@/models/userModel"
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        // creating a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        // updating token depending on email type
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken: hashedToken,
                 verifyTokenExpiry:Date.now()+3600000 })
        }else if (emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
              {forgotPasswordToken:hashedToken,
                forgotPasswordExpiry: Date.now()+ 3600000 })
        }

        // creating transport for nodemailer
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: process.env.USER_MAILER,
                  pass: process.env.PASSWORD_MAILER,
                }
              });
        // creating top domain command for token      
              const mailOptions = {
                from:'lugona@gmail.com',
                to:email,
                subject: emailType==="VERIFY"?"Verify your email":"Reset your password",
                html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to ${emailType==="VERIFY"?"verify your email":"reset your password"}
                or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
              }
        //  sending response
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse


    } catch (error:any) {
        throw new Error(error.message)
    }
}

