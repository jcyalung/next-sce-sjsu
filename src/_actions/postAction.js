'use server';

import PostModel from "@/models/postModel";
import connectDB from "@/config/database";
import User from "@/models/user";

export async function getPosts() {
    try {
        await connectDB();
        const result = JSON.parse(JSON.stringify(await PostModel.find()));
        
        /* throws shows errMsg: 'Error!' when thrown */
        //throw new Error('Error!');
        
        return { result };
    } catch (error) {
        return { errMsg: error.message }
    }
}

export async function getUsers() {
    try {
        await connectDB();
        const result = JSON.parse(JSON.stringify(await User.find()));

        return { result };
    } catch (error) {
        return { errMsg: error.message }
    }
}
