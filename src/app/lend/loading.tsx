'use client';

import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Lending & Borrowing
          </Typography>
          <Skeleton variant="text" width={300} height={24} />
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3}>
        <Box>
          <Card>
            <CardContent>
              <Skeleton variant="text" width={160} height={24} />
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <Skeleton variant="rectangular" height={96} />
                <Skeleton variant="rectangular" height={96} />
                <Skeleton variant="rectangular" height={96} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box display="flex" flexDirection="column" gap={3}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width={140} height={24} />
              <Skeleton variant="rectangular" height={160} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Skeleton variant="text" width={140} height={24} />
              <Skeleton variant="rectangular" height={160} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}


