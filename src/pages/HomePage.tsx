import React from 'react';
import { Box } from '@mui/material';
import FilterSection from '../components/FilterSection';
import LineupList from '../components/LineupList';

const HomePage: React.FC = () => {
  return (
    <Box>
      <FilterSection />
      <LineupList />
    </Box>
  );
};

export default HomePage;
