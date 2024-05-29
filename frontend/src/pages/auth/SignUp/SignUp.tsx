import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { ThemeProvider } from '@mui/material/styles';
import { CustomTextField, Title, CustomTheme } from '../components';
import { useNavigate } from 'react-router-dom';

import { userSignUpAPI } from '../api/AuthRequests';

interface signUpInfoObject {
  email: string,
  password: string,
  first_name: string,
  last_name: string
}
export default function SignUp() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
    

  const userSignUp = async (signUpInfo: signUpInfoObject) => {
    const response = await userSignUpAPI(signUpInfo)
    console.log(response)
    if (response.status !== 200){
      setError(response.data.error || "An unknown error occurred")
    } else{
      setError("");
      console.log("Sign up successfully")
      navigate('/login')
    }
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
      <div className='flex w-1/2 rounded-3xl border shadow-md bg-white justify-center content-center'>
        <div className=' w-3/4 my-10 flex flex-col items-center'>
          <ThemeProvider theme={CustomTheme} >
                <Avatar sx={{ m: 1, bgcolor: '#FF64AE' }}>
                  <LockPersonIcon sx={{color: 'white'}}/>
                </Avatar> 
                <Title className='text-3xl'>Sign up</Title>
                <a href="/login" className='text-2nd-color underline py-4'>Already got an account? Sign in here</a>
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
                  />
                <CustomTextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                  />
                <CustomTextField
                name="confirm_password"
                type={showPassword ? "text" : "password"}
                label="Confirm password"
                id="confirm_password"
                autoComplete="confirm-password"
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

                    
              </Box>

        </ThemeProvider>
      </div>
      </div>
    </div>
  );
}