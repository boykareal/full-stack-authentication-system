import { NextRequest, NextResponse } from "next/server";
import { forgotPassword } from "@/helpers/forgotpassword";
import { connect } from "@/dbconfig/dbconfig";
import { useState } from "react";

export async function POST(req:NextRequest, res: NextResponse){
    const [token, setToken] = useState("");
}