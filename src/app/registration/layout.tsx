"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function DashboardLayout({
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