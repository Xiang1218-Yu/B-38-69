import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import type { BaseItem, AdvancedItem } from '../data/items';

interface ItemCardProps {
  item: BaseItem | AdvancedItem;
  draggable?: boolean;
  isAdvanced?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  size?: 'small' | 'medium' | 'large';
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  draggable = false,
  isAdvanced = false,
  selected = false,
  onClick,
  onDragStart,
  size = 'medium',
}) => {
  const sizeMap = {
    small: { width: 48, height: 48, icon: 20, name: 10 },
    medium: { width: 64, height: 64, icon: 28, name: 11 },
    large: { width: 80, height: 80, icon: 36, name: 12 },
  };

  const dims = sizeMap[size];

  return (
    <Tooltip title={
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
        <Typography variant="body2" sx={{ fontSize: 11, opacity: 0.8 }}>{item.description}</Typography>
      </Box>
    } arrow placement="top">
      <Box
        draggable={draggable}
        onDragStart={onDragStart}
        onClick={onClick}
        sx={{
          width: dims.width,
          height: dims.height,
          borderRadius: 2,
          border: selected ? '2px solid #ffcc00' : `2px solid ${isAdvanced ? 'rgba(255, 204, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
          background: isAdvanced
            ? 'linear-gradient(135deg, rgba(255, 204, 0, 0.15) 0%, rgba(255, 204, 0, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: draggable || onClick ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: draggable || onClick ? 'translateY(-2px)' : 'none',
            boxShadow: draggable || onClick ? '0 4px 12px rgba(0, 255, 159, 0.3)' : 'none',
            borderColor: draggable || onClick ? '#00ff9f' : undefined,
          },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography sx={{ fontSize: dims.icon, lineHeight: 1 }}>{item.icon}</Typography>
        {size !== 'small' && (
          <Typography
            sx={{
              fontSize: dims.name,
              mt: 0.5,
              color: isAdvanced ? '#ffcc00' : '#fff',
              fontWeight: 500,
              textAlign: 'center',
              px: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
          >
            {item.name}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};

export default ItemCard;
