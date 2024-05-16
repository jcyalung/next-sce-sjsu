import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { COOKIE_NAME, MAX_AGE } from "../../../../../constants";
// file name must be named route

export async function POST(request: Request) {
    const body = await request.json();

    const { username, password } = body;

    // authenticate user 
    // database connection and check if user actually exists
    if(username !== 'admin' || password !== 'admin') {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

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