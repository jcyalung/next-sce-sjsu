"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AboutLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [isSuccess, setIsSuccess] = useState<boolean>(true);
    const router = useRouter();

    if(!isSuccess) {
        return <p>Loading...</p>
    }
    return (
    <main>
        <header>Nagivation</header>
        {children}
    </main>
    );
}