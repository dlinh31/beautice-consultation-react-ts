import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import tw from 'twin.macro';
import styled from 'styled-components';
import Bg from '../../../assets/home1/slide-background.png'

import { ThemeProvider } from '@mui/material/styles';
import { CustomTextField, Title, CustomTheme } from '../components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAtom } from 'jotai';
import { LoginInfoAtom } from '../../../context/loginInfoAtom';

import { userSignUpAPI } from '../api/AuthRequests';

interface signUpInfoObject {
  email: string,
  password: string
  first_name: string,
  last_name: string
}
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [login, setLogin] = useAtom(LoginInfoAtom);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()


  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(email);
    setEmailError(re.test(email) ? "" : "Invalid email format");
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    setPassword(password);
    setPasswordError(re.test(password) ? "" : "Password must be at least 8 characters long, with at least one uppercase character and one number");
  };  
  
  const validateConfirmPassword = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword)
    setConfirmPasswordError(confirmPassword === password ? "" : "Passwords do not match")
  }




  const userSignUp = async (signUpInfo: signUpInfoObject) => {
    const signUpPromise = userSignUpAPI(signUpInfo)
    .then((response) => {
      if(response.status !== 200){
        setError(response.data.error || "An unknown error occurred")
        throw new Error(response.data.error || "An unknown error occurred");
      } else {
        setError("");
        console.log("Sign up successfully")
        setLogin({email: email, password: password});
      }
      return response;
    })
    .then(() => {setTimeout( () => navigate('/login'), 1500)});
    toast.promise(
      signUpPromise,
      {
        pending: 'Signing up...',
        success: {
          render: 'Signed up successfully',
          autoClose: 1500,
        },
      }
    );

  }


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userInfo = {
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    }

    const confirmPassword = data.get('confirm_password');
    if (userInfo.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    userSignUp(userInfo)
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
                <Title className='text-3xl'>Sign up</Title>
                
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <div className='flex flex-row gap-4'>
                <CustomTextField
                name="first_name"
                label="First name"
                type="text"
                  />
                <CustomTextField
                name="last_name"
                label="Last name"
                type="text"
                  />
                </div>
                <CustomTextField
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                
                  />
                <CustomTextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => validatePassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                  />
                <CustomTextField
                name="confirm_password"
                type={showPassword ? "text" : "password"}
                label="Confirm password"
                id="confirm_password"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateConfirmPassword(e.target.value)}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                  />
              
                <FormControlLabel className='mt-2'
                  control={<Checkbox value="remember" color="primary" onChange={() => {setShowPassword(!showPassword)}}
                  sx={{
                    '&.Mui-checked	': {
                      color: '#FF4081',
                      opacity: [0.9, 0.8, 0.7],
                    }}}/>}
                    label="Show password"  
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
                  Sign up
                </Button>
                <a href="/login" className='text-2nd-color underline py-4 flex justify-center'>Already got an account? Sign in here</a>

                    
              </Box>

        </ThemeProvider>
      </div>
      </div>
    </div>
  );
}