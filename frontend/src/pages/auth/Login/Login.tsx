import React, { useState } from 'react';
import { Avatar, Button, Checkbox, FormControlLabel, Box, ThemeProvider } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { userSignInAPI } from '../api/AuthRequests';
import { CustomTextField, Title, CustomTheme } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../../context/userAtom';


export default function Login() {
  const [user, setUser] = useAtom(userAtom)
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const navigateToHome2 = () => {
    navigate('/home2')
  }
  

  const userLogin = async (userInfo: { email: string; password: string }) => {
    const response = await userSignInAPI(userInfo);
    console.log(response)
    if (response.status !== 200) {
      setError(response.data.error || "An unknown error occurred"); // Using a generic message if none is provided
    } else {
      setError(""); 
      console.log("Sign in successfully");
      localStorage.setItem('user', JSON.stringify(response.data));

      setUser(response.data);

      navigateToHome2()
    }
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
      <div className='flex w-1/2 rounded-3xl border shadow-md bg-white justify-center content-center'>
        <div className=' w-3/4 my-10 flex flex-col items-center'>
          <ThemeProvider theme={CustomTheme} >
                <Avatar sx={{ m: 1, bgcolor: '#FF64AE' }}>
                  <LockPersonIcon sx={{color: 'white'}}/>
                </Avatar> 

                <Title className='text-3xl'>Sign in</Title>
  
                <a href="/signup" className='text-2nd-color underline py-4'>New to Beautice? Sign up here</a>
              <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                <CustomTextField
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                  />
                <CustomTextField
                name="password"
                label="Password"
                type="password"
                id="password"
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
                  }}
                  >
                  Sign In
                </Button>
                <a href="/" className='text-2nd-color self-center justify-sel-center mt-10'>Forgot password?</a>

                    
              </Box>

        </ThemeProvider>
      </div>
      </div>
    </div>
  );
}