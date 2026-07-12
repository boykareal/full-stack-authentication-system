import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export async function POST(req:NextRequest, res: NextResponse){

    try {
        await connect()

        const {Password, token} = await req.json();

        console.log(Password)
        console.log(token)

        const user = await User.findOne({forgotPasswordToken: token});

        if(!user){
            return NextResponse.json(
                {message: "user not find kindly request a new link"},
                {status : 404}
            )
        }

        if(user.forgotPasswordTokenExpiry.getTime() < Date.now()){
            return NextResponse.json(
                {message: "Token expired kindly reissue a token"},
                {status: 404}
            )
        }

        const salt = await bcrypt.genSalt(10)
        
        const hashedPassword = await bcrypt.hash(Password,salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save();

        return NextResponse.json(
          { message: "Password updated successfully" },
          { status: 200 },
        );

    } catch (error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }

}