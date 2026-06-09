import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
}

const PlaceholderPage: React.FC<Props> = ({ title }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <Typography variant="h3" sx={{ color: 'primary.main', mb: 2, fontWeight: 800 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        该功能模块正在火速开发中，敬请期待...
      </Typography>
    </Box>
  );
};

export default PlaceholderPage;
