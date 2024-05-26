'use server';

import React from 'react';
import { PostResult, Post } from "@/_actions/post";
import ClientComponent from "./ClientComponent";

// import javascript function
import { getPosts } from '@/_actions/postAction';


export default async function ServerComponent() {
    const result: PostResult = await getPosts();
    const { data, errMsg } = result;

    if(errMsg) {
        return(
            <h1>{errMsg}</h1>
        );
    }

    if (data && Array.isArray(data)) {
        return <ClientComponent data={data as Post[]} />;
    }
}