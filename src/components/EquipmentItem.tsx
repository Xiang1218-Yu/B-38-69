import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import type { Equipment } from '../data/equipment';

interface EquipmentItemProps {
  equipment: Equipment;
  draggable?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
}

const tierColors: Record<Equipment['tier'], string> = {
  basic: 'rgba(158, 158, 158, 0.6)',
  advanced: 'rgba(33, 150, 243, 0.6)',
  legendary: 'rgba(255, 152, 0, 0.6)',
};

const tierBorderColors: Record<Equipment['tier'], string> = {
  basic: 'rgba(158, 158, 158, 0.8)',
  advanced: 'rgba(33, 150, 243, 0.8)',
  legendary: 'rgba(255, 152, 0, 0.8)',
};

const tierGlowColors: Record<Equipment['tier'], string> = {
  basic: 'rgba(158, 158, 158, 0.3)',
  advanced: 'rgba(33, 150, 243, 0.4)',
  legendary: 'rgba(255, 152, 0, 0.5)',
};

const tierLabels: Record<Equipment['tier'], string> = {
  basic: '基础',
  advanced: '高级',
  legendary: '传奇',
};

const sizeConfig = {
  small: { width: 48, height: 48, fontSize: 24, nameSize: 'caption' as const },
  medium: { width: 64, height: 64, fontSize: 32, nameSize: 'body2' as const },
  large: { width: 80, height: 80, fontSize: 40, nameSize: 'body1' as const },
};

const EquipmentItem: React.FC<EquipmentItemProps> = ({
  equipment,
  draggable = false,
  onClick,
  size = 'medium',
  showName = true,
}) => {
  const config = sizeConfig[size];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('equipmentId', equipment.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {equipment.name}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            {tierLabels[equipment.tier]}品质
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {equipment.description}
          </Typography>
          <Box sx={{ mt: 1 }}>
            {Object.entries(equipment.stats).map(([key, value]) => (
              <Typography key={key} variant="caption" sx={{ display: 'block' }}>
                {key}: +{value}
              </Typography>
            ))}
          </Box>
        </Box>
      }
      arrow
      placement="top"
    >
      <Box
        draggable={draggable}
        onDragStart={handleDragStart}
        onClick={onClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: draggable ? 'grab' : onClick ? 'pointer' : 'default',
          '&:active': draggable ? { cursor: 'grabbing' } : {},
          userSelect: 'none',
        }}
      >
        <Box
          sx={{
            width: config.width,
            height: config.height,
            borderRadius: 2,
            backgroundColor: tierColors[equipment.tier],
            border: `2px solid ${tierBorderColors[equipment.tier]}`,
            boxShadow: `0 0 12px ${tierGlowColors[equipment.tier]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: config.fontSize,
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: `0 0 20px ${tierGlowColors[equipment.tier]}`,
            },
          }}
        >
          {equipment.icon}
        </Box>
        {showName && (
          <Typography
            variant={config.nameSize}
            sx={{
              mt: 0.5,
              color: tierBorderColors[equipment.tier],
              fontWeight: 500,
              textAlign: 'center',
              maxWidth: config.width,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {equipment.name}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};

export default EquipmentItem;
