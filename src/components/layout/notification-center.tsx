'use client';

import { useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  NotificationsActive,
  NotificationsNone,
} from '@mui/icons-material';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read?: boolean;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'gas-alert',
    title: 'Gas fees spiking',
    message: 'Ethereum mainnet gas is above 45 gwei. Consider increasing slippage tolerance.',
    severity: 'warning',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'farm-apr',
    title: 'Farm APR boost',
    message: 'New incentives live on the ETH-USDC Curve pool. APR up to 12.4%.',
    severity: 'success',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'health-factor',
    title: 'Low health factor',
    message: 'Your Aave position on Polygon is nearing liquidation. Top up collateral soon.',
    severity: 'error',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
];

const formatDistance = (timestamp: string) => {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.floor(hours / 24);
  return `${days} d ago`;
};

export default function NotificationCenter() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const hasUnread = unreadCount > 0;

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  return (
    <>
      <Tooltip title={hasUnread ? `${unreadCount} new alerts` : 'No new alerts'} arrow>
        <IconButton onClick={toggleMenu} color={hasUnread ? 'primary' : 'default'} size="large">
          <Badge color="primary" badgeContent={unreadCount} overlap="circular" invisible={!hasUnread}>
            {hasUnread ? <NotificationsActive /> : <NotificationsNone />}
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 420,
            p: 0,
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" px={2.5} py={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              Notifications
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Insights and risk alerts tailored to your positions
            </Typography>
          </Box>
          <Button variant="text" size="small" onClick={markAllRead} disabled={!hasUnread}>
            Mark all read
          </Button>
        </Box>

        <Box px={2.5} pb={2.5}>
          <Alert severity="info" variant="outlined" sx={{ mb: 2 }}>
            Risk engine curates alerts from protocols you interact with.
          </Alert>
          <List disablePadding>
            {notifications.map((item) => (
              <ListItem
                key={item.id}
                alignItems="flex-start"
                sx={{
                  borderRadius: 2,
                  mb: 1.25,
                  bgcolor: item.read ? 'transparent' : 'action.hover',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'action.focus',
                  },
                }}
                onMouseEnter={() => markAsRead(item.id)}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor:
                        item.severity === 'error'
                          ? 'error.light'
                          : item.severity === 'warning'
                            ? 'warning.light'
                            : item.severity === 'success'
                              ? 'success.light'
                              : 'info.light',
                      color:
                        item.severity === 'error'
                          ? 'error.dark'
                          : item.severity === 'warning'
                            ? 'warning.dark'
                            : item.severity === 'success'
                              ? 'success.dark'
                              : 'info.dark',
                    }}
                  >
                    {item.severity === 'success' ? '✓' : item.severity === 'info' ? 'i' : '!'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {item.title}
                      </Typography>
                      {!item.read ? (
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{
                            px: 0.75,
                            py: 0.25,
                            borderRadius: 999,
                            bgcolor: 'primary.light',
                            color: 'primary.dark',
                            fontWeight: 600,
                          }}
                        >
                          New
                        </Typography>
                      ) : null}
                    </Box>
                  }
                  secondary={
                    <Box component="span" display="flex" flexDirection="column" gap={0.5} mt={0.5}>
                      <Typography variant="body2" color="text.secondary">
                        {item.message}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {formatDistance(item.timestamp)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Menu>
    </>
  );
}
