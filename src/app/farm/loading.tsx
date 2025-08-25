'use client';

import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Yield Farming
          </Typography>
          <Skeleton variant="text" width={280} height={24} />
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '2fr 1fr' }} gap={3}>
        <Box>
          <Card>
            <CardContent>
              <Skeleton variant="text" width={160} height={24} />
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <Skeleton variant="rectangular" height={120} />
                <Skeleton variant="rectangular" height={120} />
                <Skeleton variant="rectangular" height={120} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card>
            <CardContent>
              <Skeleton variant="text" width={180} height={24} />
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <Skeleton variant="rectangular" height={80} />
                <Skeleton variant="rectangular" height={80} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}


