"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { getUser } from "../dashboard/layout";

export default function RegisterLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const { user, error } = await getUser();

            if(error) {
                return;
            }

            setIsSuccess(true);
        })();
    }, [router]);
    if(!isSuccess) {
        return (
        <main>
            {children}
        </main>
        )
    }
    return (
    <main>
        {children}
    </main>
    );
}