'use client';

import { forwardRef, useEffect, useMemo, useState } from 'react';
import {
  alpha,
  Box,
  Chip,
  Dialog,
  Divider,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Search, Launch } from '@mui/icons-material';

type PaletteItem = {
  id: string;
  label: string;
  description?: string;
  chips?: string[];
  onSelect: () => void;
};

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: PaletteItem[];
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CommandPalette({ open, onClose, items }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const filteredItems = useMemo(() => {
    if (!query) return items;
    const lower = query.toLowerCase();
    return items.filter((item) =>
      item.label.toLowerCase().includes(lower) ||
      item.description?.toLowerCase().includes(lower) ||
      item.chips?.some((chip) => chip.toLowerCase().includes(lower)),
    );
  }, [items, query]);

  const handleSelect = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(16px)',
        },
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          placeholder="Search destinations, quick actions, or settings"
          size="small"
          value={query}
          autoFocus
          onChange={(event) => setQuery(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="caption" color="text.secondary">
          Press ⏎ to run the highlighted action • Esc to close
        </Typography>
        <Divider />
        <List sx={{ maxHeight: 320, overflowY: 'auto' }}>
          {filteredItems.map((item) => (
            <ListItemButton
              key={item.id}
              onClick={() => handleSelect(item.onSelect)}
              sx={{ borderRadius: 2, mb: 0.75 }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.label}
                  </Typography>
                }
                secondary={
                  <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" mt={0.5}>
                    {item.description ? (
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    ) : null}
                    {item.chips?.map((chip) => (
                      <Chip key={chip} size="small" label={chip} variant="outlined" />
                    ))}
                  </Box>
                }
              />
              <Launch fontSize="small" color="disabled" />
            </ListItemButton>
          ))}
          {filteredItems.length === 0 ? (
            <Box textAlign="center" py={4} color="text.disabled">
              <Typography variant="subtitle1" fontWeight={600}>
                No matches found
              </Typography>
              <Typography variant="body2">
                Try searching for dashboard, swap, or type "settings" to jump to preferences.
              </Typography>
            </Box>
          ) : null}
        </List>
      </Box>
    </Dialog>
  );
}
