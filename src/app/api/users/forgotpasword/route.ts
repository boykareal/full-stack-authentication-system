import { NextRequest, NextResponse } from "next/server";
import { forgotPassword } from "@/helpers/forgotpassword";
import {connect} from '@/dbconfig/dbconfig'

export async function POST(req: NextRequest){
    try {
        await connect();
        const {email} = await req.json();
        await forgotPassword(email)
        return NextResponse.json({
           message: "reset password message send succesfully",
           success: true,
         });
    } catch (err:any) {
        return NextResponse.json({error: err.message},{status:500})
    }
}