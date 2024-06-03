import { getUsers } from "@/_actions/postAction";
import connectDB from "@/config/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    const { firstName, lastName, username, password, major, plan } = await request.json();
    const { result } = await getUsers();
    console.log(result);

    // check if email ends with @sjsu.edu
    await connectDB();
    try {
        await User.create({firstName, lastName, username, password, major, plan});
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