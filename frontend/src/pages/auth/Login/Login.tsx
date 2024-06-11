import React, { useEffect, useState } from 'react';
import { Avatar, Button, Checkbox, FormControlLabel, Box, ThemeProvider } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { userSignInAPI } from '../api/UserRequests';
import { CustomTextField, Title, CustomTheme } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { LoginInfoAtom } from '../../../context/loginInfoAtom';
import tw from 'twin.macro';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userAtom, User } from '../../../context/userAtom';
import Bg from '../../../assets/home1/slide-background.png'


export default function Login() {
  const [login] = useAtom(LoginInfoAtom);
  const [email, setEmail] = useState(login.email || "");
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState(login.password || "");
  const [, setUser] = useAtom(userAtom);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const navigateToHome2 = () => {
    navigate('/home2')
  }
  useEffect(() => {
    const currentToken = localStorage.getItem('token')
    if (currentToken){
      navigate('/home2')
  }
  }, [])
  

  const userLogin = async (userInfo: { email: string; password: string }) => {
    const loginPromise = userSignInAPI(userInfo)
    .then((response) => {
      if (response.status !== 200) {
        setError(response.data.error)
        throw new Error(response.data.error || "An unknown error occurred");
      }
      console.log("Sign in successfully");
    const { user_id, email, first_name, last_name, token } = response.data;
      const userData = { user_id, email, first_name, last_name };
      
      if (rememberMe){
        localStorage.setItem('token', token);
      }
      const userContext: User = userData;
      console.log(userContext)
      setUser(userContext);
      return response;
    })
    .then(() => { setTimeout(() => navigateToHome2(), 1500)})
  
    toast.promise(
      loginPromise,
      {
        pending: 'Logging in...',
        success: {
          render: 'Logged in successfully',
          autoClose: 1500,
        },
      }
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    }
    userLogin(userInfo);

  };

  return (
    <div className='h-screen w-full flex items-center justify-center content-center'>
    <ToastContainer />
      <img tw='absolute -z-10 top-0 left-0 max-w-[100vw] right-0' src={Bg} alt="" />
      <div className='flex w-1/2 rounded-3xl border shadow-md bg-white justify-center content-center'>
        <div className=' w-3/4 my-10 flex flex-col items-center'>
          <ThemeProvider theme={CustomTheme} >
                <Avatar sx={{ m: 1, bgcolor: '#FF64AE' }}>
                  <LockPersonIcon sx={{color: 'white'}}/>
                </Avatar> 
                <Title className='text-3xl'>Sign in</Title>
              <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                <CustomTextField
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                autoComplete="email"
                  />
                <CustomTextField
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                autoComplete="current-password"
                  />
              
                <FormControlLabel className='mt-2'
                  control={<Checkbox value="remember" color="primary" 
                sx={{
                  '&.Mui-checked	': {
                    color: '#FF4081',
                    opacity: [0.9, 0.8, 0.7],
                  }
                }}
                  checked={rememberMe}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                  />}
                  label="Remember me"
                  
                />

                {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>)}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, py:1, bgcolor: '#FF64AE', borderRadius: '50px',
                  '&:hover': {
                    bgcolor: '#FF4081',
                    opacity: [0.9, 0.8, 0.7],
                  }
                  }}> Sign In </Button>
                <a href="/" className='text-2nd-color self-center mt-2 flex justify-center'>Forgot password?</a>
                <a href="/signup" className='text-2nd-color underline py-4 flex justify-center'>New to Beautice? Sign up here</a>
              </Box>

        </ThemeProvider>
      </div>
      </div>
    </div>
  );
}

