'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
} from '@mui/material';
import {
  Settings,
  Save,
  VolumeUp,
  VolumeOff,
  Email,
  Phone,
  Web,
  Backup,
  Restore,
} from '@mui/icons-material';
import { WalletConnectionTest } from '@/components/wallet-connection-test';
import { useSession } from 'next-auth/react';

// Default preferences (used for demos/settings)
const userData = {
  preferences: {
    theme: 'light',
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
    notifications: {
      email: true,
      push: true,
      sms: false,
      priceAlerts: true,
      securityAlerts: true,
      newsUpdates: false,
    },
    security: {
      twoFactorAuth: true,
      biometricAuth: false,
      sessionTimeout: 30,
      autoLock: true,
    },
    performance: {
      autoRefresh: true,
      refreshInterval: 30,
      cacheEnabled: true,
      analyticsEnabled: true,
    },
  },
};

function ProfileSettings() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [joinDate, setJoinDate] = useState<string>('');

  const fullName = session?.user?.name || '';
  const [firstName, ...rest] = fullName.split(' ').filter(Boolean);
  const lastName = rest.length ? rest.join(' ') : '';

  const [formData, setFormData] = useState({
    name: fullName,
    email: session?.user?.email || '',
  });

  useEffect(() => {
    setFormData({ name: fullName, email: session?.user?.email || '' });
  }, [fullName, session?.user?.email]);

  useEffect(() => {
    // Store a simple client-side join date the first time user visits settings
    const key = 'defiapp_join_date';
    let stored = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    if (!stored) {
      stored = new Date().toISOString();
      if (typeof window !== 'undefined') window.localStorage.setItem(key, stored);
    }
    setJoinDate(stored || new Date().toISOString());
  }, []);

  const handleSave = () => {
    console.log('Saving profile:', formData);
    setEditing(false);
  };

  return (
    <Card className="animate-fade-in-up">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Profile Settings
          </Typography>
          <Button
            variant="outlined"
            startIcon={editing ? <Save /> : <Settings />}
            onClick={editing ? handleSave : () => setEditing(true)}
          >
            {editing ? 'Save' : 'Edit'}
          </Button>
        </Box>

        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <Avatar sx={{ width: 80, height: 80 }}>
            {(firstName || session?.user?.email || 'U').charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {firstName}{lastName ? ` ${lastName}` : ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since {new Date(joinDate).toLocaleDateString()}
            </Typography>
            {session?.user?.email && (
              <Typography variant="body2" color="text.secondary">{session.user.email}</Typography>
            )}
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!editing}
            fullWidth
          />
          <TextField
            label="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!editing}
            fullWidth
          />
        </Box>

        <Box mt={3} p={2} bgcolor="grey.50" borderRadius={2}>
          <Typography variant="body2" fontWeight={600} mb={1}>
            Connected Wallet
          </Typography>
          <Typography variant="body2" color="text.secondary" fontFamily="monospace">
            {userData.walletAddress}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    console.log('Changing password');
  };

  return (
    <Card className="animate-fade-in-up stagger-1">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Security Settings
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          {/* Two-Factor Authentication */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body1" fontWeight={600}>
                Two-Factor Authentication
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add an extra layer of security to your account
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={userData.preferences.security.twoFactorAuth}
                  onChange={() => console.log('Toggle 2FA')}
                />
              }
              label=""
            />
          </Box>

          <Divider />

          {/* Biometric Authentication */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body1" fontWeight={600}>
                Biometric Authentication
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use fingerprint or face recognition
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={userData.preferences.security.biometricAuth}
                  onChange={() => console.log('Toggle biometric')}
                />
              }
              label=""
            />
          </Box>

          <Divider />

          {/* Session Timeout */}
          <Box>
            <Typography variant="body1" fontWeight={600} mb={2}>
              Session Timeout ({userData.preferences.security.sessionTimeout} minutes)
            </Typography>
            <Slider
              value={userData.preferences.security.sessionTimeout}
              onChange={(_, value) => console.log('Session timeout:', value)}
              min={5}
              max={120}
              step={5}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

          <Divider />

          {/* Change Password */}
          <Box>
            <Typography variant="body1" fontWeight={600} mb={2}>
              Change Password
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VolumeOff /> : <VolumeUp />}
                    </IconButton>
                  ),
                }}
              />
              <TextField
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
              />
              <TextField
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function NotificationSettings() {
  const [notifications, setNotifications] = useState(userData.preferences.notifications);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications({ ...notifications, [key]: value });
  };

  return (
    <Card className="animate-fade-in-up stagger-2">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Notification Settings
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Email color="primary" />
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Email Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive updates via email
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.email}
                  onChange={(e) => handleNotificationChange('email', e.target.checked)}
                />
              }
              label=""
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Web color="primary" />
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  Push Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browser push notifications
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.push}
                  onChange={(e) => handleNotificationChange('push', e.target.checked)}
                />
              }
              label=""
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Phone color="primary" />
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  SMS Notifications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Text message alerts
                </Typography>
              </Box>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.sms}
                  onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                />
              }
              label=""
            />
          </Box>

          <Divider />

          <Typography variant="body1" fontWeight={600} mb={2}>
            Alert Types
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body1" fontWeight={600}>
                Price Alerts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get notified of significant price changes
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.priceAlerts}
                  onChange={(e) => handleNotificationChange('priceAlerts', e.target.checked)}
                />
              }
              label=""
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body1" fontWeight={600}>
                Security Alerts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Important security notifications
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.securityAlerts}
                  onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                />
              }
              label=""
            />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body1" fontWeight={600}>
                News Updates
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Latest DeFi news and updates
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.newsUpdates}
                  onChange={(e) => handleNotificationChange('newsUpdates', e.target.checked)}
                />
              }
              label=""
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function PreferencesSettings() {
  const [preferences, setPreferences] = useState(userData.preferences);

  return (
    <Card className="animate-fade-in-up stagger-3">
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Preferences
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          {/* Language */}
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              label="Language"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="de">Deutsch</MenuItem>
              <MenuItem value="zh">中文</MenuItem>
            </Select>
          </FormControl>

          {/* Currency */}
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              value={preferences.currency}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              label="Currency"
            >
              <MenuItem value="USD">USD ($)</MenuItem>
              <MenuItem value="EUR">EUR (€)</MenuItem>
              <MenuItem value="GBP">GBP (£)</MenuItem>
              <MenuItem value="JPY">JPY (¥)</MenuItem>
              <MenuItem value="CNY">CNY (¥)</MenuItem>
            </Select>
          </FormControl>

          {/* Timezone */}
          <FormControl fullWidth>
            <InputLabel>Timezone</InputLabel>
            <Select
              value={preferences.timezone}
              onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
              label="Timezone"
            >
              <MenuItem value="UTC">UTC</MenuItem>
              <MenuItem value="EST">Eastern Time</MenuItem>
              <MenuItem value="PST">Pacific Time</MenuItem>
              <MenuItem value="GMT">GMT</MenuItem>
              <MenuItem value="CET">Central European Time</MenuItem>
            </Select>
          </FormControl>

          <Divider />

          {/* Performance Settings */}
          <Typography variant="body1" fontWeight={600} mb={2}>
            Performance
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body1" fontWeight={600}>
                Auto Refresh
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Automatically refresh data
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.performance.autoRefresh}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    performance: {
                      ...preferences.performance,
                      autoRefresh: e.target.checked
                    }
                  })}
                />
              }
              label=""
            />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Refresh Interval ({preferences.performance.refreshInterval} seconds)
            </Typography>
            <Slider
              value={preferences.performance.refreshInterval}
              onChange={(_, value) => setPreferences({
                ...preferences,
                performance: {
                  ...preferences.performance,
                  refreshInterval: value as number
                }
              })}
              min={10}
              max={300}
              step={10}
              marks
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h3" fontWeight={700} mb={1}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account preferences and security settings
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<Backup />}>
            Export Data
          </Button>
          <Button variant="outlined" startIcon={<Restore />}>
            Import Data
          </Button>
        </Box>
      </Box>

      <WalletConnectionTest />

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }} gap={4}>
        {/* Left Column */}
        <Box>
          <ProfileSettings />
          
          <Box mt={3}>
            <SecuritySettings />
          </Box>
        </Box>

        {/* Right Column */}
        <Box>
          <NotificationSettings />
          
          <Box mt={3}>
            <PreferencesSettings />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
