import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';



import { CustomTextField, Title, CustomTheme } from '../components';


// TODO remove, this demo shouldn't need to reset the theme.



export default function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className='h-screen w-full flex items-center justify-center content-center'>
      <div className='flex w-1/2 rounded-3xl border shadow-md bg-white justify-center content-center'>
        <div className=' w-3/4 my-10 flex flex-col items-center'>
          <ThemeProvider theme={CustomTheme} >
                <Avatar sx={{ m: 1, bgcolor: '#FF64AE' }}>
                  <LockOutlinedIcon sx={{color: 'white'}}/>
                </Avatar> 

                <Title className='text-3xl'>Sign in</Title>
  
                <a href="/signup" className='text-2nd-color underline py-4'>New to Beautice? Sign up here</a>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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