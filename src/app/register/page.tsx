"use client"

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Background from "../background/background";
export default function RegisterPage() {
    const [verified, setVerified] = useState(/*process.env.NODE_ENV !== 'production'*/true);
    const [major, setMajor]       = useState('');
    const [plan, setPlan]         = useState('');
    const [message, setMessage]   = useState('');
    const VALID_EMAIL_REGEXP = new RegExp(
      '^\\s*(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)' +
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])' +
      '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))\\s*$'
    );

    const checkValidEmail = (email: string) => {
      return email && VALID_EMAIL_REGEXP.test(email);
    };
  
    const checkValidPassword = (password: string) => {
      return (
        password &&
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password)
      );
    };

    const requiredFieldsMet = (payload: any, confirmPassword: String) => {
      let message = '';
      const { firstName, lastName, email, password } = payload;
      if(!checkValidEmail(email)) {
        message = "Invalid email.";
        setMessage(message);
      }
      else if(!checkValidPassword(password)) {
        message = "Invalid password. Your password must be: \nat least 8 or more characters, \na lowercase letter, \nan uppercase letter, \nand a number 0-9.";
        setMessage(message);
      }
      else if(password !== confirmPassword) {
        message = "Passwords do not match.";
        setMessage(message);
      }
      else if(major.length === 0) {
        message = "Please select a major.";
        setMessage(message);
      }
      else if(!verified) {
        message = "Please verify the captcha.";
        setMessage(message);
      } 
      if(message.length > 0) { alert(message); }
      return (
        verified &&
        firstName &&
        lastName &&
        checkValidEmail(email) &&
        major &&
        checkValidPassword(password) &&
        password === confirmPassword
      );
    };
    
    
    /* const maybeShowCaptcha = () => {
      return process.env.NODE_ENV === 'production' ?
        <GoogleRecaptcha setVerified={setVerified} /> : null;
    }; */
    
    const { push } = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            firstName: event.currentTarget.firstName.value,
            lastName: event.currentTarget.lastName.value,
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
            major: major,
            plan: plan,
            membershipState: 1,
        };
        if(!requiredFieldsMet(payload, event.currentTarget.confirmpass.value)) { return; }
        try {
            const { data } = await axios.post("/api/auth/users/register", payload);
            
            alert(JSON.stringify(data));

            push("/");
        } catch (e) {
            const error = e as AxiosError;
            const { data }: any = error.response;
            alert(`${error.message}: ${data.message ? data.message: ''}`);
        }
    };
    
    function membershipExpDate(semestersToSignUpFor = 1) {
      const today = new Date();
  
      const endOfSpringSem = `June 1, ${today.getFullYear()}`;
      const endOfSpringSemNext = `June 1, ${today.getFullYear() + 1}`;
      const endOfFallSemThisYear = `January 1, ${today.getFullYear() + 1}`;
  
      // Lookup table to resolve a readble expiration date for a
      // new member. The first key is the number of semesters they
      // wish to sign up for and the second (nested) key is whether
      // this page was rendered during spring time or not.
      const expirationMap = {
        1: {
          true: endOfSpringSem,
          false: endOfFallSemThisYear
        },
        2: {
          true: endOfFallSemThisYear,
          false: endOfSpringSemNext
        }
      };
  
      // spring checks if current month is between January and May
      const spring = today.getMonth() >= 0 && today.getMonth() <= 4;
      if(semestersToSignUpFor == 1) {
        if(spring) {
          return endOfSpringSem;
        }
        else {
          return endOfFallSemThisYear;
        }
      }
      else {
        if(spring) {
          return endOfFallSemThisYear;
        }
        else {
          return endOfSpringSemNext;
        }
      }
    }

    const handleMajorChange = (event: any) => {
      setMajor(event.target.value);
    };
    const handlePlanChange = (event: any) => {
      setPlan(event.target.value);
    };

    return (
    <main>
    <Background />
    <div className=''>
      <div className = 'flex-none md:flex mt-0 pt-20 '>
        <div className='rounded-3xl backdrop-blur-sm bg-[#D7D7D7] shadow-2xl mt-20 mb-auto ml-auto mr-auto px-10 text-center items-center justify-center'>
          <div className = 'text-lg md:text-3xl font-bold pb-2'>
            Semester Plan
          </div>
          <div className="stats stats-vertical shadow">
            <div className="stat">
              <div className="stat-title text-2xl md:text-3xl">Price</div>
              <div className="stat-value text-2xl md:text-3xl">$20</div>
              <div className="stat-desc">1 semester</div>
            </div>

            <div className="stat">
              <div className="stat-title text-2xl md:text-3xl">Expires</div>
              <div className="stat-value text-2xl md:text-3xl">{membershipExpDate()}</div>
              <div className="stat-desc">↗︎ Only Up From here</div>
            </div>
          </div>
          <div className = 'text-lg md:text-3xl font-bold pb-2 pt-4'>
            Yearly Plan
          </div>
          <div className="stats stats-vertical shadow">
            <div className="stat">
              <div className="stat-title text-2xl md:text-3xl">Price</div>
              <div className="stat-value text-2xl md:text-3xl">$30</div>
              <div className="stat-desc">2 semester</div>
            </div>

            <div className="stat">
              <div className="stat-title text-2xl md:text-3xl">Expires</div>
              <div className="stat-value text-2xl md:text-3xl">{membershipExpDate(2)}</div>
              <div className="stat-desc">↗︎ Only Up From here</div>
            </div>
          </div>
          <div className='venmo-link text-2xl md:text-3xl py-3'>
            <a
              href='https://venmo.com/u/sce-treasurer'
              style={{ color: 'black' }}
              className='opacity-50 hover:opacity-100 font-bold underline duration-300'
            >
              Click to pay fee
            </a>
            <p className='text-sm no-underline '> You do not need to pay to make an account</p>
          </div>
        </div>
        <div className='rounded-3xl backdrop-blur-sm shadow-2xl bg-[#D7D7D7] mt-20  ml-auto mr-auto px-10 text-center items-center justify-center'>
          <p className='text-3xl font-bold' >Membership Application</p>
          <p className='text-2xl font-bold '>
            Year: {new Date().getFullYear()}
          </p>
          <h6 className='text-lg'>
            * = Required field
          </h6>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="First Name*"
              className='w-full bg-[#ABC9CF] rounded-full placeholder-gray-800 text-black pl-2'
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="Last Name*"
              className='w-full bg-[#ABC9CF] rounded-full placeholder-gray-800 text-black pl-2'
            />
          </div>
          <div> 
            <input
              type="text"
              id="email"
              name="email"
              required
              placeholder="Email*"
              className='w-full bg-[#ABC9CF] rounded-full placeholder-gray-800 text-black pl-2'
            />
          </div>
          <div>
            <input
              type="text"
              id="password"
              name="password"
              required
              placeholder="Password*"
              className='w-full bg-[#ABC9CF] rounded-full placeholder-gray-800 text-black pl-2'
            />
          </div>
          <div>
            <input
              type="text"
              id="confirmpass"
              name="confirmpass"
              required
              placeholder="Confirm Password*"
              className='w-full bg-[#ABC9CF] rounded-full placeholder-gray-800 text-black pl-2'
            />
          </div>
          <p className='text-l text-center'> Select Major </p>
          <div className='flex text-center text-gray-100 justify-center gap-4'>
              <label className="label">
                <p className='text-bold text-black'> CS </p>
                <input type="radio" name="radio-10" className="radio" value='Computer Science'   onClick={handleMajorChange}/>
              </label>
              <label className="label">
                <p className='text-bold text-black'> SWE </p>
                <input type="radio" name="radio-10" className="radio" value='Software Engineering'  onClick={handleMajorChange}/>
              </label>
              <label className="label">
                <p className='text-bold text-black'> CMPE </p>
                <input type="radio" name="radio-10" className="radio" value='Computer Engineering'  onClick={handleMajorChange}/>
              </label>
              <label className="label">
                <p className='text-bold text-black'> Other </p>
                <input type="radio" name="radio-10" className="radio" value='Other'  onClick={handleMajorChange}/>
              </label>
            </div>
            <p className='text-l text-center'> Select Plan </p>
            <div className='flex text-center text-gray-100 justify-center gap-4'>
              <label className="label">
                <p className='text-bold text-black'> Semester </p>
                <input type="radio" name="radio-11" className="radio" value='Semester'   onClick={handlePlanChange}/>
              </label>
              <label className="label">
                <p className='text-bold text-black'> Annual </p>
                <input type="radio" name="radio-11" className="radio" value='Annual'  onClick={handlePlanChange}/>
              </label>
              <label className="label">
                <p className='text-bold text-black'> None </p>
                <input type="radio" name="radio-11" className="radio" value='None'  onClick={handlePlanChange}/>
              </label>
            </div>
            {/* recaptcha to implement later*/}
            <div id='recaptcha'>
              {/*maybeShowCaptcha()*/}
            </div>

          <button
            type="submit"
            className="btn mt-20 bg-blue-600 text-white w-fit rounded"
          >
            Submit
          </button>
      </form>
        </div>
      </div>
    </div>
    </main>
    );




    /*
    return (
    <main>
        <Background />
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
    </main>
    )
    */
}

