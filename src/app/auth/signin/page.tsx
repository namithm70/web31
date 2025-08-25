'use client';

import { Box, Card, CardContent, TextField, Typography, Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ px: 2 }}>
      <Card sx={{ width: 420 }} className="animate-fade-in-up">
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Welcome back. Enter your credentials to continue.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField label="Email" type="email" fullWidth autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth size="large">
              Continue
            </Button>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don&apos;t have an account?
            </Typography>
            <MuiLink component={Link} href="/auth/signup" underline="none">
              Create account
            </MuiLink>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


