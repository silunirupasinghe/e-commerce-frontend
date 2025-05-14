'use client';
import React from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import colors from '../../theme/color'; // ✅ import theme
import { Google } from '@mui/icons-material';
import { Poppins } from 'next/font/google';

const LoginPage = () => {
  return (
    <Box display="flex" height="100vh" bgcolor={colors.background}>
      
      {/* Left Pane */}
      <Box
        flex={1}
        bgcolor="#CBE4E8"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img src="/login/image.png" alt="Shopping" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>

      {/* Right Pane */}
      <Box
        flex={1}
        p={8}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bgcolor={colors.background}
      >
        <Typography variant="h4" fontWeight={500} color={colors.textPrimary} sx={{fontFamily:'inter'}} gutterBottom>
          Log in to Exclusive
        </Typography>
        <Typography variant="body2" color={colors.textPrimary} mb={2}>
          Enter your details below
        </Typography>

        <TextField
          placeholder="Email or Phone Number"
          fullWidth
          variant="outlined"
          sx={{
            mt: 2,
            input: { padding: '14px' },
            '& fieldset': {
              borderColor: colors.inputBorder,
              borderRadius: '6px',
            },
          }}
        />

        <TextField
          placeholder="Password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{
            mt: 2,
            input: { padding: '14px' },
            '& fieldset': {
              borderColor: colors.inputBorder,
              borderRadius: '6px',
            },
          }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.primary,
              padding: '12px 30px',
              borderRadius: '3px',
              fontWeight: 'bold',
              color: colors.textPrimary,
              
            }}
          >
            Log In
          </Button>
          <Link href="#" underline="hover" sx={{ color: colors.primary, fontSize: '16px', fontFamily:'Poppins' }}>
            Forget Password?
          </Link>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 4,
            borderColor: colors.googleBorder,
            padding: '12px',
            borderRadius: '6px',
            textTransform: 'none',
          }}
        >
            <Google sx={{ mr:2}}/>
          Sign up with Google
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
