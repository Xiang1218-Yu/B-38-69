import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import type { Equipment } from '../data/equipment';
import { basicEquipments, advancedEquipments, legendaryEquipments } from '../data/equipment';
import EquipmentItem from './EquipmentItem';

interface EquipmentListProps {
  onEquipmentClick?: (equipment: Equipment) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ onEquipmentClick }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getEquipmentsByTab = (): Equipment[] => {
    switch (tabValue) {
      case 0:
        return basicEquipments;
      case 1:
        return advancedEquipments;
      case 2:
        return legendaryEquipments;
      default:
        return basicEquipments;
    }
  };

  const getTabLabels = ['基础装备', '高级装备', '传奇装备'];

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
        装备库
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 2,
          minHeight: 36,
          '& .MuiTab-root': {
            minHeight: 36,
            fontSize: '0.8rem',
            color: 'text.secondary',
          },
          '& .Mui-selected': {
            color: 'primary.main !important',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'primary.main',
          },
        }}
      >
        {getTabLabels.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: 2,
          alignContent: 'start',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
          },
        }}
      >
        {getEquipmentsByTab().map((equipment) => (
          <EquipmentItem
            key={equipment.id}
            equipment={equipment}
            draggable={true}
            size="small"
            onClick={() => onEquipmentClick?.(equipment)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default EquipmentList;
