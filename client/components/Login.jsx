'use client'; // this is a client component

import React, { useState, useRef, useEffect } from 'react';
import { AiFillUnlock, AiFillLock } from 'react-icons/ai';
import axios from 'axios';
import {
  GUEST_USER_CREDS,
  SERVER_BASE_URL,
  SESSION_STORAGE_TOKEN,
} from '../constants/index';
import { Tooltip, useToast, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const emailRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem(SESSION_STORAGE_TOKEN)) {
        router.push('/HomePage');
      }
    }
  }, []);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const submitHandler = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${SERVER_BASE_URL}/api/user/login`,
        { email, password },
        config,
      );

      console.log(data, 'data');

      toast({
        title: 'Login successful !',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      sessionStorage.setItem(SESSION_STORAGE_TOKEN, JSON.stringify(data.token));
      setLoading(false);
      router.push('/HomePage');

      // dispatch(setCurrentUserCredentialsToStore());
    } catch (error) {
      toast({
        title: 'Something went wrong !',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto max-w-3xl my-8 p-8 rounded-lg border-2 border-appBlue'>
      <div className='h-12 rounded-lg text-appBlue flex items-center justify-center text-lg font-extrabold'>
        Log in to your portfolio
      </div>
      <div className='flex flex-col my-10 gap-4'>
        <div className='flex bg-white w-3/6 mx-auto border-2 border-appBlue'>
          <input
            type='text'
            id='e-mail'
            ref={emailRef}
            className='h-12 rounded-sm px-4 focus:outline-none'
            value={email || ''}
            placeholder='Enter Your E-mail Here'
            onChange={event => setEmail(event.target.value)}
          />
        </div>
        <div className='flex bg-white w-3/6 mx-auto border-2 border-appBlue'>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            className='h-12 rounded-sm px-4 focus:outline-none w-11/12'
            value={password || ''}
            placeholder='Enter Your Password Here'
            onChange={event => setPassword(event.target.value)}
          />
          <button onClick={() => handlePasswordVisibility()}>
            {!showPassword ? (
              <Tooltip
                label='Show Password'
                aria-label='tooltip-pwd-show'
                hasArrow
                background='#457b9d'
                color='white'
                padding='0px 8px'
              >
                <span>
                  <AiFillLock className='text-lg' />
                </span>
              </Tooltip>
            ) : (
              <Tooltip
                label='Hide Password'
                aria-label='tooltip-pwd-hide'
                hasArrow
                background='#457b9d'
                color='white'
                padding='0px 8px'
              >
                <span>
                  <AiFillUnlock className='text-lg' />
                </span>
              </Tooltip>
            )}
          </button>
        </div>
        <div className='flex bg-white w-3/6 mx-auto items-center justify-between py-4'>
          <button
            className='bg-appBlue h-10 rounded-lg text-white flex items-center justify-center w-5/12 text-base'
            onClick={() => {
              if (
                email !== GUEST_USER_CREDS.email &&
                password !== GUEST_USER_CREDS.password
              ) {
                setEmail(GUEST_USER_CREDS.email);
                setPassword(GUEST_USER_CREDS.password);
              }
            }}
          >
            Use Guest Login
          </button>
          <button
            disabled={!email || !password}
            className='bg-appBlue h-10 rounded-lg text-white flex items-center justify-center text-base w-5/12  disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed'
            onClick={() => submitHandler()}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
