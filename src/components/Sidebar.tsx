import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemButton, Tooltip, Typography, Popover } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AutoAwesomeMotion as LineupIcon,
  BarChart as StatsIcon,
  Groups as HeroIcon,
  Storage as ItemsIcon,
  Settings as SettingsIcon,
  QrCode2 as QrIcon
} from '@mui/icons-material';

import './Sidebar.css';

interface SidebarProps {
  onClose?: () => void;
  mobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [qrAnchor, setQrAnchor] = React.useState<HTMLElement | null>(null);

  const handleItemClick = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleQrOpen = (event: React.MouseEvent<HTMLElement>) => {
    setQrAnchor(event.currentTarget);
  };

  const handleQrClose = () => {
    setQrAnchor(null);
  };

  const navItems = [
    { icon: <LineupIcon />, label: '阵容', path: '/' },
    { icon: <StatsIcon />, label: '数据', path: '/stats' },
    { icon: <HeroIcon />, label: '英雄', path: '/heroes' },
    { icon: <ItemsIcon />, label: '物品', path: '/items' },
    { icon: <SettingsIcon />, label: '设置', path: '/settings' },
  ];

  return (
    <Box
      sx={{
        width: 80,
        height: '100vh',
        backgroundColor: '#050508', // Darker, cleaner obsidian black
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
        position: 'fixed',
        left: 0,
        top: 0,
        borderRight: '1px solid rgba(255, 255, 255, 0.04)',
        boxShadow: '4px 0 10px rgba(0, 0, 0, 0.3)', // Added shadow for depth
        zIndex: 1200,
      }}
    >
      <Box
        sx={{
          mb: 4,
          cursor: 'pointer',
          width: 42,
          height: 42,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid rgba(0, 255, 159, 0.4)',
          boxShadow: '0 0 15px rgba(0, 255, 159, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000'
        }}
        onClick={() => navigate('/')}
      >
        <img src="/logo.png" alt="logo" width="100%" height="auto" className="sidebar-logo" />
      </Box>

      <List sx={{ width: '100%' }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
            <Tooltip title={item.label} placement="right" arrow>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  justifyContent: 'center',
                  py: 1.5,
                  color: location.pathname === item.path ? 'primary.main' : 'rgba(255,255,255,0.4)',
                  backgroundColor: location.pathname === item.path ? 'rgba(0, 255, 159, 0.08)' : 'transparent',
                  position: 'relative',
                  '&::before': location.pathname === item.path ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: 3,
                    backgroundColor: 'primary.main',
                    borderRadius: '0 4px 4px 0',
                  } : {},
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                  }
                }}
                selected={location.pathname === item.path}
              >
                <ListItemIcon sx={{ minWidth: 0, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', textAlign: 'center' }}>
        <Box
          onMouseEnter={handleQrOpen}
          onMouseLeave={handleQrClose}
          sx={{
            p: 1,
            backgroundColor: 'white',
            borderRadius: 1,
            width: 48,
            height: 48,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-in',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
        >
          <QrIcon sx={{ color: 'black', fontSize: 40 }} />
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
          APP下载
        </Typography>


        <Popover
          open={Boolean(qrAnchor)}
          anchorEl={qrAnchor}
          onClose={handleQrClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          sx={{
            pointerEvents: 'none',
            ml: 2,
          }}
          PaperProps={{
            sx: {
              p: 2,
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <QrIcon sx={{ color: 'black', fontSize: 180 }} />
            <Typography variant="body2" sx={{ color: 'black', fontWeight: 800, mt: 1 }}>
              扫码下载移动端
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.5)', display: 'block' }}>
              适配 iOS & Android
            </Typography>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default Sidebar;
