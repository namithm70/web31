'use client';

import { Box, Card, CardContent, TextField, Typography, Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default function SignUpPage() {
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

          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField label="Name" fullWidth autoComplete="name" />
            <TextField label="Email" type="email" fullWidth autoComplete="email" />
            <TextField label="Password" type="password" fullWidth autoComplete="new-password" />
            <Button variant="contained" fullWidth size="large">
              Create account
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


