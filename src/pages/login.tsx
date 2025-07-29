import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Link,
  Divider,
  Grid
} from '@mui/material';
import axios from 'axios';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setError('');
      // Replace with your actual API endpoint
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f3f2ef',
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
          p: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 500, color: '#0a66c2' }}>
          Genesis 
          <Box component="span" sx={{ color: 'text.primary' }}>Trainings</Box>
        </Typography>
        
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 400 }}>
          Sign in
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
          Some caption
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%', 
              mb: 2,
            }}
          >
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit(onSubmit)} 
          sx={{ width: '100%' }}
        >
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email or Phone"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Please enter your email or phone',
            })}
          />
          
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <Link 
                  component="button" 
                  type="button"
                  sx={{ 
                    fontSize: 14, 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Link>
              ),
            }}
            {...register('password', {
              required: 'Please enter your password',
            })}
          />
          
          <Link 
            href="#" 
            variant="body2" 
            sx={{ 
              display: 'block', 
              mt: 1, 
              mb: 2,
              fontWeight: 600,
              color: '#0a66c2',
              '&:hover': { 
                color: '#004182', 
                textDecoration: 'underline',
                backgroundColor: 'rgba(112, 181, 249, 0.2)',
                borderRadius: '4px'
              }
            }}
          >
            Forgot password?
          </Link>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ 
              py: 1.5,
              mb: 2,
              borderRadius: 50,
              fontWeight: 600,
              fontSize: 16,
              backgroundColor: '#0a66c2',
              '&:hover': { backgroundColor: '#004182' },
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
          
          <Box sx={{ position: 'relative', mt: 3, mb: 3 }}>
            <Divider sx={{ bgcolor: 'divider' }} />
            <Typography 
              variant="body2" 
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                px: 2,
                color: 'text.secondary'
              }}
            >
              or
            </Typography>
          </Box>
          
          <Grid container justifyContent="center" sx={{ mt: 3, mb: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Register{' '}
              <Link 
                href="#" 
                sx={{ 
                  fontWeight: 600,
                  color: '#0a66c2',
                  '&:hover': { 
                    textDecoration: 'underline',
                  }
                }}
              >
                here
              </Link>
            </Typography>
          </Grid>
        </Box>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
                   <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
            Trainings © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;