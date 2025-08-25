    'use client';

import { Box, Card, CardContent, TextField, Typography, Button, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Sign up failed');
      setSuccess('Account created. Redirecting to sign in...');
      setTimeout(() => {
        window.location.href = '/auth/signin';
      }, 800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ px: 2 }}>
      <Card sx={{ width: 480 }} className="animate-fade-in-up">
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Create account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start your monochrome DeFi experience.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
            <TextField label="Name" fullWidth autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Email" type="email" fullWidth autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}>
              {loading ? 'Creating...' : 'Create account'}
            </Button>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>
            <MuiLink component={Link} href="/auth/signin" underline="none">
              Sign in
            </MuiLink>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


