import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { COOKIE_NAME, MAX_AGE } from "../../../../../constants";
import connectDB from "@/config/database";
import { getUsers } from "@/_actions/postAction";
// file name must be named route

export async function POST(request: Request) {
    const body = await request.json();

    const { username, password } = body;
    const { result } = await getUsers();
    
    // authenticate user 
    try {
        await connectDB();
        const account = result.filter((account: { username: any; password: any; }) => account.username == username && account.password == password);
        //console.log(account);
        if(username !== 'admin' && password !== 'admin' && !account) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }
    } catch (error) {
        return NextResponse.json({message: "An error occured"}, { status: 400 });
    }
    // database connection and check if user actually exists
    

    // get environment variables
    // always check your strong password
    const secret = process.env.JWT_SECRET || "";

    const token = sign(
        {
            username,
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