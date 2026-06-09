import React from 'react';
import { Box, Typography, Button, IconButton, Tooltip, Chip } from '@mui/material';
import { AutoAwesome as SynthIcon, Delete as DeleteIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { placeItem, removeItem, clearSlots, addResult } from '../../store/equipmentSlice';
import type { RootState } from '../../store';
import { getItemById, findRecipeByIngredients, buildSynthesisTree } from '../../data/equipmentData';

const SynthesisArea: React.FC = () => {
  const dispatch = useDispatch();
  const slots = useSelector((state: RootState) => state.equipment.slots);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);
  const [synthAnimation, setSynthAnimation] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const item1 = slots[0].itemId ? getItemById(slots[0].itemId) : null;
  const item2 = slots[1].itemId ? getItemById(slots[1].itemId) : null;

  const canSynth = item1 && item2;
  const recipe = canSynth ? findRecipeByIngredients(slots[0].itemId!, slots[1].itemId!) : null;
  const resultItem = recipe ? getItemById(recipe.result) : null;

  const handleDragOver = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(slotIndex);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    if (itemId) {
      dispatch(placeItem({ slotIndex, itemId }));
    }
    setDragOverIndex(null);
  };

  const handleSynth = () => {
    if (!recipe || !resultItem) return;

    setSynthAnimation(true);
    setTimeout(() => {
      const tree = buildSynthesisTree(resultItem.id);
      dispatch(addResult({
        itemId: resultItem.id,
        tree,
        timestamp: Date.now(),
      }));
      dispatch(clearSlots());
      setSynthAnimation(false);
    }, 800);
  };

  const handleSlotClick = (slotIndex: number) => {
    if (slots[slotIndex].itemId) {
      dispatch(removeItem(slotIndex));
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
        ⚗️ 合成区域
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          mb: 2,
          flexWrap: 'wrap',
        }}
      >
        {[0, 1].map((slotIndex) => {
          const item = slotIndex === 0 ? item1 : item2;
          const isDragOver = dragOverIndex === slotIndex;

          return (
            <React.Fragment key={slotIndex}>
              <Box
                onDragOver={(e) => handleDragOver(e, slotIndex)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, slotIndex)}
                onClick={() => handleSlotClick(slotIndex)}
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 3,
                  border: `2px dashed ${
                    isDragOver
                      ? '#00ff9f'
                      : item
                        ? `${item.color}88`
                        : 'rgba(255,255,255,0.15)'
                  }`,
                  backgroundColor: isDragOver
                    ? 'rgba(0,255,159,0.08)'
                    : item
                      ? `${item.color}10`
                      : 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: item ? 'pointer' : 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': item ? {
                    borderColor: item.color,
                    backgroundColor: `${item.color}20`,
                  } : {},
                }}
              >
                {item ? (
                  <>
                    <Typography sx={{ fontSize: '2rem', lineHeight: 1 }}>{item.icon}</Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: item.color, fontWeight: 700, mt: 0.5 }}>
                      {item.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeItem(slotIndex));
                      }}
                      sx={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: 20,
                        height: 20,
                        color: 'rgba(255,255,255,0.3)',
                        '&:hover': { color: '#ff6b6b' },
                      }}
                    >
                      <ClearIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </>
                ) : (
                  <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', px: 1 }}>
                    {isDragOver ? '释放放置' : `槽位 ${slotIndex + 1}`}
                  </Typography>
                )}
              </Box>

              {slotIndex === 0 && (
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '1.5rem', fontWeight: 800 }}>
                  +
                </Typography>
              )}
            </React.Fragment>
          );
        })}
      </Box>

      {canSynth && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          {resultItem ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                = 合成为
              </Typography>
              <Chip
                icon={<span style={{ fontSize: '1rem' }}>{resultItem.icon}</span>}
                label={resultItem.name}
                sx={{
                  backgroundColor: `${resultItem.color}20`,
                  border: `1px solid ${resultItem.color}66`,
                  color: resultItem.color,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  py: 2.5,
                  px: 1,
                }}
              />
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                {resultItem.stats.map((s, i) => (
                  <Typography key={i} variant="caption" sx={{ color: '#00ff9f', fontSize: '0.65rem' }}>
                    {s}
                  </Typography>
                ))}
              </Box>
            </Box>
          ) : (
            <Typography sx={{ color: '#ff6b6b', fontSize: '0.85rem' }}>
              ❌ 这两件装备无法合成
            </Typography>
          )}
        </Box>
      )}

      {error && (
        <Typography sx={{ color: '#ff6b6b', fontSize: '0.85rem', textAlign: 'center', mb: 1 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button
          variant="contained"
          disabled={!canSynth || !recipe || synthAnimation}
          onClick={handleSynth}
          startIcon={<SynthIcon />}
          sx={{
            background: canSynth && recipe
              ? 'linear-gradient(135deg, #00ff9f, #00cc7f)'
              : undefined,
            color: canSynth && recipe ? '#000' : undefined,
            fontWeight: 800,
            px: 4,
            py: 1.2,
            borderRadius: 2,
            fontSize: '0.95rem',
            '&:hover': {
              background: canSynth && recipe
                ? 'linear-gradient(135deg, #00cc7f, #009960)'
                : undefined,
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.2)',
            },
          }}
        >
          {synthAnimation ? '合成中...' : '合成'}
        </Button>
        <Tooltip title="清空槽位">
          <IconButton
            onClick={() => dispatch(clearSlots())}
            sx={{
              color: 'rgba(255,255,255,0.3)',
              '&:hover': { color: '#ff6b6b' },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {synthAnimation && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '3rem',
              animation: 'pulse 0.8s ease-in-out infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.3)', opacity: 0.7 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          >
            ✨⚗️✨
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SynthesisArea;
