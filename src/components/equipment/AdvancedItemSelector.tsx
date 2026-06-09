import React from 'react';
import { Box, Typography, Chip, Tooltip, Collapse } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdvancedItem } from '../../store/equipmentSlice';
import type { RootState } from '../../store';
import { ADVANCED_ITEMS, buildSynthesisTree } from '../../data/equipmentData';
import SynthesisTree from './SynthesisTree';

const AdvancedItemSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAdvancedItem = useSelector((state: RootState) => state.equipment.selectedAdvancedItem);

  const tree = selectedAdvancedItem ? buildSynthesisTree(selectedAdvancedItem) : null;

  const handleSelect = (itemId: string) => {
    dispatch(selectAdvancedItem(selectedAdvancedItem === itemId ? null : itemId));
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
        🌟 高级装备图鉴
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2, display: 'block' }}>
        点击高级装备查看完整合成轨迹
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {ADVANCED_ITEMS.map(item => (
          <Tooltip
            key={item.id}
            title={
              <Box>
                {item.stats.map((s, i) => (
                  <Typography key={i} variant="caption" sx={{ display: 'block', color: '#00ff9f' }}>
                    {s}
                  </Typography>
                ))}
              </Box>
            }
            arrow
          >
            <Chip
              icon={<span style={{ fontSize: '0.9rem' }}>{item.icon}</span>}
              label={item.name}
              onClick={() => handleSelect(item.id)}
              sx={{
                backgroundColor: selectedAdvancedItem === item.id ? `${item.color}25` : `${item.color}10`,
                border: `1px solid ${selectedAdvancedItem === item.id ? item.color : `${item.color}33`}`,
                color: item.color,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: `${item.color}20`,
                  borderColor: item.color,
                },
              }}
            />
          </Tooltip>
        ))}
      </Box>

      <Collapse in={!!tree} timeout="auto">
        {tree && (
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography sx={{ fontSize: '1.3rem' }}>{tree.icon}</Typography>
              <Typography sx={{ fontWeight: 800, color: tree.color, fontSize: '1rem' }}>
                {tree.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                合成轨迹
              </Typography>
            </Box>
            <SynthesisTree tree={tree} />
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default AdvancedItemSelector;
