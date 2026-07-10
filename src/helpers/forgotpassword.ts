import crypto from "crypto"
import User from "@/models/userModel";
import nodemailer from "nodemailer"


export const forgotPassword = async(email : any) => {
    try{
        const hashedToken = crypto.randomBytes(32).toString("hex");
        const user = await User.findOne({email});

        if(!user){
            throw new Error("user does not exist with this email kindly register!!")
        }

        console.log(user)

        user.forgotPasswordToken = hashedToken;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000;
        
        await user.save()


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASS,
            }
        })

        const mailOptions = {
            from: "vaibhav3sharma@gmail.com",
            to: email,
            subject: "Reset your password",
            html: `<p>Click <a href= "${process.env.DOMAIN}/ResetPassword?token=${hashedToken}">here</a> to "reset your password
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/ResetPassword?token=${hashedToken}`,
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    }catch(error: any){
        throw new Error(error.message)
    }
}