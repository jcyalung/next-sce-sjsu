import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { COOKIE_NAME, MAX_AGE } from "@/app/constants";
import connectDB from "@/config/database";
import { getUsers } from "@/_actions/postAction";
import User from "@/models/user";
// file name must be named route

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    let account: any;
    // authenticate user 
    try {
        await connectDB();
        account = await authenticate(email, password);
        if(!account.firstName) {
            return NextResponse.json({message: "Username or password does not match our records."}, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({message: "An error occured"}, { status: 400 });
    }
    // database connection and check if user actually exists
    
    // get environment variables
    // always check your strong password
    const secret = process.env.JWT_SECRET || "";
    const { firstName, lastName, plan, membershipState} = account;
    const token = sign(
        {
            email,
            firstName,
            lastName,
            plan,
            membershipState,
        },
        secret, {
            expiresIn: MAX_AGE,
        }
    );

    /*
        log someone out by setting serialized maxAge to -1
        this makes the token expire instantly
    */
    const serialized = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
    });

    const response = {
        message: "Authenticated!"
    };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Set-Cookie": serialized },
    });
}

async function authenticate(email: String, password: String) {
    try {
        await connectDB();
        const result = await User.find({email});
        const user = result[0];
        if(user.password === password) {
            return user;
        }
        else {
            return {};
        }
    } catch(e) {
        const error = e as Error;
        return NextResponse.json({message: `An error occurred: ${error.message}`}, { status: 400 })
    }
}