import React from 'react';
import { Box, Typography } from '@mui/material';
import { baseItems } from '../data/items';
import ItemCard from './ItemCard';

const BaseItemPanel: React.FC = () => {
  const handleDragStart = (itemId: string) => (e: React.DragEvent) => {
    e.dataTransfer.setData('itemId', itemId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
        基础装备
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        拖拽装备到合成台进行合成
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {baseItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            draggable
            onDragStart={handleDragStart(item.id)}
            size="medium"
          />
        ))}
      </Box>
    </Box>
  );
};

export default BaseItemPanel;
