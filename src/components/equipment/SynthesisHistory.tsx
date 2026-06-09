import React from 'react';
import { Box, Typography, Chip, Collapse, IconButton } from '@mui/material';
import { ExpandMore as ExpandIcon, ExpandLess as CollapseIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { getItemById } from '../../data/equipmentData';
import SynthesisTree from './SynthesisTree';

const SynthesisHistory: React.FC = () => {
  const results = useSelector((state: RootState) => state.equipment.results);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  if (results.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          borderRadius: 3,
          border: '1px dashed rgba(255,255,255,0.1)',
          backgroundColor: 'rgba(255,255,255,0.02)',
        }}
      >
        <Typography sx={{ fontSize: '2rem', mb: 1 }}>⚗️</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          还没有合成记录
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)' }}>
          拖拽装备至合成区域开始合成
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
        📜 合成历史
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {results.map((result, index) => {
          const item = getItemById(result.itemId);
          if (!item) return null;

          const isExpanded = expandedIndex === index;

          return (
            <Box
              key={`${result.itemId}-${result.timestamp}`}
              sx={{
                borderRadius: 2,
                border: `1px solid ${item.color}22`,
                backgroundColor: `${item.color}05`,
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: `${item.color}44`,
                  backgroundColor: `${item.color}0a`,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  cursor: 'pointer',
                }}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <Typography sx={{ fontSize: '1.3rem' }}>{item.icon}</Typography>
                <Typography sx={{ fontWeight: 700, color: item.color, fontSize: '0.9rem', flex: 1 }}>
                  {item.name}
                </Typography>
                <Chip
                  label={item.tier === 'combined' ? '合成' : '高级'}
                  size="small"
                  sx={{
                    backgroundColor: `${item.tier === 'combined' ? '#fbbf24' : '#ff6b6b'}20`,
                    color: item.tier === 'combined' ? '#fbbf24' : '#ff6b6b',
                    fontWeight: 700,
                    fontSize: '0.6rem',
                    height: 20,
                  }}
                />
                <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                  {isExpanded ? <CollapseIcon sx={{ fontSize: 16 }} /> : <ExpandIcon sx={{ fontSize: 16 }} />}
                </IconButton>
              </Box>

              <Collapse in={isExpanded} timeout="auto">
                <Box sx={{ px: 2, pb: 2 }}>
                  <SynthesisTree tree={result.tree} />
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SynthesisHistory;
