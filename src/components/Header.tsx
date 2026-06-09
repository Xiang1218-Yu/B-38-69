import React from 'react';
import { Box, AppBar, Toolbar, Typography, Select, MenuItem, Avatar, IconButton, Menu, Snackbar, useMediaQuery, useTheme } from '@mui/material';
import { Notifications as NotificationsIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentVersion } from '../store/lineupSlice';
import type { RootState } from '../store';

interface HeaderProps {
  onMenuClick?: () => void;
  isMobile?: boolean; // Keep for compatibility if needed, but we'll use local check for consistency
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobileLocal = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const version = useSelector((state: RootState) => state.lineups.currentVersion);
  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(null);
  const [toastOpen, setToastOpen] = React.useState(false);

  const handleOpenNotif = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleCloseNotif = () => {
    setNotifAnchor(null);
  };

  const handleAvatarClick = () => {
    setToastOpen(true);
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobileLocal && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 0, color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: isMobileLocal ? 0 : 1,
              color: 'primary.main',
              fontSize: isMobileLocal ? '1.1rem' : '1.25rem'
            }}
          >
            GAMEASSIST
          </Typography>
          <Select
            value={version}
            onChange={(e) => dispatch(setCurrentVersion(e.target.value as string))}
            size="small"
            sx={{
              height: 32,
              fontSize: '0.875rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}
          >
            <MenuItem value="14.2">版本 14.2</MenuItem>
            <MenuItem value="14.1">版本 14.1</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton size="small" onClick={handleOpenNotif}>
            <NotificationsIcon sx={{ color: 'text.secondary' }} />
          </IconButton>

          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={handleCloseNotif}
            slotProps={{
              paper: {
                sx: {
                  mt: 1.5,
                  backgroundColor: 'background.paper',
                  backgroundImage: 'none',
                  minWidth: 200,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }
              }
            }}
          >
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                暂无新通知
              </Typography>
            </Box>
          </Menu>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              noWrap
              sx={{
                color: 'text.primary',
                maxWidth: { xs: 80, md: 150 },
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              召唤师小白
            </Typography>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'secondary.main',
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={handleAvatarClick}
            >
              白
            </Avatar>
          </Box>
        </Box>
      </Toolbar>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={handleCloseToast}
        message="正在跳转用户中心..."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          top: '50% !important',
          left: '50% !important',
          transform: 'translate(-50%, -50%)',
          zIndex: 2000,
          width: 'fit-content',
        }}
        slotProps={{
          content: {
            sx: {
              backgroundColor: 'primary.main',
              color: 'black',
              fontWeight: 800,
              borderRadius: 2,
              px: 4,
              py: 1.5,
              boxShadow: 'none',
              minWidth: 0,
              width: 'fit-content',
              maxWidth: 'calc(100vw - 48px)',
              '& .MuiSnackbarContent-message': {
                width: '100%',
                textAlign: 'center',
                fontSize: '1rem',
                whiteSpace: 'nowrap'
              }
            }
          }
        }}
      />
    </AppBar>
  );
};

export default Header;
