"use client";

import React, { useEffect, useState } from 'react';
import { membershipStates, membershipStateToString } from '../constants/Enums';
import { useRouter } from 'next/navigation';
import getUser from '../api/getUser';

export default function ProfilePage() {
    const router = useRouter();
    const { push } = router;
    const [user, setUser]               = useState({});

    useEffect(() => {
        (async () => {
            const { user, error } = await getUser();
            if(error) { 
                push("/"); 
            }
            else {
                setUser(user);
            }
        })();
    }, [router]);

    function renderExpirationDate() {
        if (user.membershipState >= membershipStates.OFFICER) {
          return (
            <span>
              N/A due to {membershipStateToString(user.membershipState)} account
            </span>
          );
        }
        return (
          <span>Expiration goes here</span>
        );
      }

    return (
    <div className='bg-gradient-to-r from-gray-800 to-gray-600 min-h-[calc(100dvh-86px)] px-6'>
      <div className='h-6'/>
      <div className="bg-slate-300 p-6 shadow-sm rounded-lg w-full">
        <div className="flex justify-between items-center space-x-2 font-semibold text-gray-900 leading-8">
          <div className='flex space-x-3'>
            <svg className="mt-1 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="tracking-wide text-lg">{user.firstName} {user.lastName}</span>
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() =>
              {console.log("bruh");}
              }
            >
              Change Password
            </button>
          </div>
        </div>
        <div className="text-gray-700">
          <div className="grid text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href="mailto:jane@example.com">{user.email}</a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Pages printed this week (resets Sunday)</div>
              <div className="px-4 py-2">{user.pagesPrinted} pages</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Account Type</div>
              <div className="px-4 py-2">{membershipStateToString(user.membershipState)}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Account Created</div>
              <div className="px-4 py-2">{new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Membership Expiration</div>
              <div className="px-4 py-2">{renderExpirationDate()}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}