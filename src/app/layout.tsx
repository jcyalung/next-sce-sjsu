"use client"

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import "./globals.css";
import { membershipStates } from '@/app/constants/Enums';
import axios from "axios";
import getUser from "./api/getUser";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [initials, setInitials]   = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [membershipState, setMembershipState] = useState(-3);
  const router = useRouter();
  const { push } = router;
  
  const unauthedRoutes = [
    { title: 'About', route: '/about' },
    { title: 'Projects', route: '/projects' },
  ];
  const authedRoutes = [{ title: 'Printing', route: '/2DPrinting' }];
  const authentication = [
    { title: 'Sign Up', route: '/register' },
    { title: 'Sign In', route: '/login' },
  ];

  async function handleLogout() {
    const payload = {
      signout: 1,
    }
    const { data } = await axios.post("/api/auth/logout", payload);
    alert(`Successfully logged out. See you later ${firstName + " " + lastName}!`)
    window.location.reload();
  }

  useEffect(() => {
      (async () => {
          const { user, error }: any = await getUser();
          if(error) { return; }
          const { firstName, lastName, email, membershipState }: any = user;
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
          setMembershipState(membershipState);
          setInitials(firstName[0] + lastName[0]);
          setIsSuccess(true);
      })();
  }, [router]);

  const getRoutesForNavbar = () => {
    let routesList = unauthedRoutes;
    if (membershipState >= membershipStates.MEMBER) {
      routesList = authedRoutes;
    }
    return (
      <>
        {routesList.map((link) => {
          return (
            <li key={link.route}><a href={link.route}>{link.title}</a></li>
          );
        })}
        {membershipState >= membershipStates.OFFICER && (
          <li>
            <a href='/user-manager'>
              Admin
            </a>
          </li>
        )}
      </>
    );
  };

  const getSignedOutDropdownRoutes = () => {
    const routesList = [...unauthedRoutes, ...authentication];
    return (
      <>
        {routesList.map((link) => {
          return (
            <li key={link.route}><a href={link.route}>{link.title}</a></li>
          );
        })}
      </>
    );
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a href='/'>
            <img id='logo-image' src='./favicon.ico'
              alt={'sce-logo'} style={{ width: '70px' }} />
          </a>
        </div>
        <div className="hidden navbar-center sm:flex">
          <ul className="menu menu-horizontal">
            {getRoutesForNavbar()}
          </ul>
        </div>
        <div className="navbar-end">
        {isSuccess && firstName.length !== 0 ? (
          <>
            <div className="dropdown dropdown-end sm:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">Services</div>
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                {getRoutesForNavbar()}
              </ul>
            </div>


            <div className="dropdown dropdown-bottom dropdown-end">
              <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder">
                <div className="w-12 rounded-full bg-neutral text-neutral-content">
                  <span>{initials}</span>
                </div>
              </summary>
              <div className='p-2 shadow menu dropdown-content z-[1] bg-base-100 w-52'>
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{firstName} {lastName}</div>
                  <div className="font-medium truncate">{email}</div>
                </div>
                <ul className='p-2 shadow menu rounded-b-xl dropdown-content z-[1] bg-base-100  w-52'>
                  <li>
                    <a href='/profile'>
                      Profile
                    </a>
                  </li>
                  <li>
                    <button onClick={() => handleLogout()}>
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown dropdown-end sm:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                <button className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                {getSignedOutDropdownRoutes()}
              </ul>
            </div>

            <div className="hidden sm:flex">
              <ul className="px-1 menu menu-horizontal">
                <li>
                  <a href='/login'>
                    Sign In
                  </a>
                </li>
                <li>
                  <a href='/register'>
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
        {children}
        </body>
    </html>
  );
}
