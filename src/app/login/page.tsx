"use client"

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Background from "../background/background"

export default function LoginPage(props:any) {
    const { push } = useRouter();
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
        };

        try {
            const { data } = await axios.post("/api/auth/login", payload);
            alert(JSON.stringify(data));
            window.location.reload();
            push("/");
        } catch(e) {
            const error = e as AxiosError;
            alert(error.message);
        }
    }
    return (
        <div className = 'flex-none md:flex  pt-4 '>
      <div className='rounded-3xl backdrop-blur-sm shadow-2xl md:w-1/3 bg-[#D7D7D7] mt-20 pb-4 mb-auto ml-auto mr-auto px-5 text-center items-center justify-center'>
        <div className='flex justify-center'>
          <img id='img' alt='sce logo' src='https://sce.sjsu.edu/images/SCE-glow.png' width='2rem' className='w-2/3 px-auto'/>
        </div>
        <form onSubmit={handleSubmit} className=''>
          <div className='flex flex-col items-center'>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input type="email" id="email" placeholder="Email" required className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password" id="password" placeholder="Password" required className="input input-bordered w-full max-w-xs"/>
            </label>
            <button type='submit' id='loginBtn' className='btn w-full max-w-xs mt-5'>
              Login
            </button>
            <a className='btn mt-5 w-full max-w-xs' href='/register'>
              <button type='submit'>
                Create an Account
              </button>
            </a>
          </div>
        </form>
      </div>
      <Background />
    </div>
    )
}