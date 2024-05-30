"use client"

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { getPosts } from "@/_actions/postAction";
import React from "react";

export default function RegistrationPage() {
    const { push } = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value,
        };

        try {
            const { data } = await axios.post("/api/auth/users/register", payload);

            alert(JSON.stringify(data));

            push("/");
        } catch (e) {
            const error = e as AxiosError;
            alert(error.message);
        }
    }

    const retrieve = async () => {
        const { data } = await axios.get("/api/auth/users/register");
        console.log(JSON.stringify(data));
    }

    return (
        <main>
      <h1>Register Username and Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="border rounded border-black"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              required
              className="border rounded border-black"
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-orange-600 text-white w-fit rounded"
          >
            Submit
          </button>
      </form>
      <button 
      onSubmit={retrieve}
      className="p-2 bg-orange-600 text-white w-fit rounded"
      >retreive</button>
    </main>
    )
}