import { getUsers } from "@/_actions/postAction";
import connectDB from "@/config/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    const { firstName, lastName, email, password, major, plan, membershipState } = await request.json();
    console.log(membershipState);
    // check if email ends with @sjsu.edu
    await connectDB();
    try {
        const duplicate = await checkDuplicate(email);
        if(duplicate) { return duplicate; }
        await User.create({firstName, lastName, email, password, major, plan, membershipState});
        return NextResponse.json({ message: "Successfully created user!" }, { status: 200 });
    }
    catch (e) {
        return NextResponse.json({ message: "An error occured" }, { status: 400 });
    }
}

export async function GET(request: Request) {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({ users });
}

async function checkDuplicate(email: String) {
    await connectDB();
    try {
        const possibleAccount = await User.find({email});
        if(possibleAccount.firstName) {
            return NextResponse.json({ message: "A user with that account already exists."}, { status: 401 });
        }
    } catch (e) {
        const error = e as Error;
        return NextResponse.json({ message: "An error occurred" }, { status: 400 });
    }
    return false;
}