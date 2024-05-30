import connectDB from "@/config/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    const { username, password } = await request.json();
    console.log(username);
    // check if email ends with @sjsu.edu
    if(!username.endsWith("@sjsu.edu")) {
        return NextResponse.json({message: "Your email must end in @sjsu.edu."}, {status: 400})
    }
    await connectDB();
    try {
        await User.create({username, password});
        return NextResponse.json({message: "Successfully created user!"}, { status: 201 });
    }
    catch (e) {
        return NextResponse.json({message: "An error occured"}, {status: 400})
    }
}

export async function GET(request: Request) {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({ users });
}