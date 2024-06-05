import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { COOKIE_NAME, MAX_AGE } from "@/app/constants";
import connectDB from "@/config/database";
import User from "@/models/user";
export async function POST(request: Request) {
    const body = await request.json();
    // database connection and check if user actually exists
    
    // get environment variables
    // always check your strong password
    const secret = process.env.JWT_SECRET || "";
    const token = sign(
        {
            signout: "signout",
        },
        secret, {
            expiresIn: -1,
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
        maxAge: -1,
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
