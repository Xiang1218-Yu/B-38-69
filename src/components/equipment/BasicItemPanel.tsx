import React from 'react';
import { Box, Typography, Tooltip, Chip } from '@mui/material';
import { BASIC_ITEMS, COMBINED_ITEMS, findRecipesContainingIngredient } from '../../data/equipmentData';
import type { EquipmentItem } from '../../data/equipmentData';

interface BasicItemPanelProps {
  onItemClick?: (itemId: string) => void;
  showCombined?: boolean;
}

const ItemCard: React.FC<{
  item: EquipmentItem;
  onClick?: (itemId: string) => void;
  compact?: boolean;
}> = ({ item, onClick, compact }) => {
  const [dragging, setDragging] = React.useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('itemId', item.id);
    e.dataTransfer.effectAllowed = 'move';
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const recipeCount = findRecipesContainingIngredient(item.id).length;

  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{item.name}</Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>{item.description}</Typography>
          {item.stats.map((s, i) => (
            <Typography key={i} variant="caption" sx={{ display: 'block', color: '#00ff9f' }}>{s}</Typography>
          ))}
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#aaa' }}>
            可合成: {recipeCount} 件装备
          </Typography>
        </Box>
      }
      arrow
      placement="top"
    >
      <Box
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => onClick?.(item.id)}
        sx={{
          width: compact ? 56 : 64,
          height: compact ? 56 : 64,
          borderRadius: 2,
          border: `2px solid ${dragging ? '#00ff9f' : `${item.color}44`}`,
          backgroundColor: `${item.color}15`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          transition: 'all 0.2s ease',
          opacity: dragging ? 0.5 : 1,
          '&:hover': {
            borderColor: item.color,
            backgroundColor: `${item.color}25`,
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 12px ${item.color}30`,
          },
          '&:active': {
            cursor: 'grabbing',
          },
          userSelect: 'none',
        }}
      >
        <Typography sx={{ fontSize: compact ? '1.2rem' : '1.5rem', lineHeight: 1 }}>
          {item.icon}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.6rem',
            color: item.color,
            fontWeight: 700,
            mt: 0.3,
            lineHeight: 1,
            textAlign: 'center',
            maxWidth: compact ? 48 : 56,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.name}
        </Typography>
      </Box>
    </Tooltip>
  );
};

const BasicItemPanel: React.FC<BasicItemPanelProps> = ({ onItemClick, showCombined = false }) => {
  const [tab, setTab] = React.useState<'basic' | 'combined'>('basic');

  const items = tab === 'basic' ? BASIC_ITEMS : COMBINED_ITEMS;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
          🎒 装备库
        </Typography>
        {showCombined && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label="基础"
              size="small"
              onClick={() => setTab('basic')}
              sx={{
                backgroundColor: tab === 'basic' ? 'primary.main' : 'rgba(255,255,255,0.08)',
                color: tab === 'basic' ? '#000' : 'text.secondary',
                fontWeight: 700,
                '&:hover': { backgroundColor: tab === 'basic' ? 'primary.main' : 'rgba(255,255,255,0.12)' },
              }}
            />
            <Chip
              label="合成"
              size="small"
              onClick={() => setTab('combined')}
              sx={{
                backgroundColor: tab === 'combined' ? 'secondary.main' : 'rgba(255,255,255,0.08)',
                color: tab === 'combined' ? '#000' : 'text.secondary',
                fontWeight: 700,
                '&:hover': { backgroundColor: tab === 'combined' ? 'secondary.main' : 'rgba(255,255,255,0.12)' },
              }}
            />
          </Box>
        )}
      </Box>

      <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1.5, display: 'block' }}>
        {tab === 'basic' ? '拖拽基础装备至合成区域' : '拖拽已合成装备至合成区域进行进阶合成'}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
          gap: 1.5,
          maxHeight: 400,
          overflowY: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: 2 },
        }}
      >
        {items.map(item => (
          <ItemCard key={item.id} item={item} onClick={onItemClick} compact={tab === 'combined'} />
        ))}
      </Box>
    </Box>
  );
};

export default BasicItemPanel;
