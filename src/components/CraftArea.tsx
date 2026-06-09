import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Close, Add, AutoAwesome } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, setSlot1, setSlot2, craftItem, clearSlots } from '../store';
import { getItemById, findSynthesisResult, baseItems } from '../data/items';
import ItemCard from './ItemCard';

const CraftArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slot1, slot2 } = useSelector((state: RootState) => state.itemCraft);

  const item1 = slot1 ? getItemById(slot1) : null;
  const item2 = slot2 ? getItemById(slot2) : null;
  const result = slot1 && slot2 ? findSynthesisResult(slot1, slot2) : null;
  const canCraft = result !== null && result !== undefined;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (slot: 1 | 2) => (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    if (baseItems.find(i => i.id === itemId)) {
      if (slot === 1) {
        dispatch(setSlot1(itemId));
      } else {
        dispatch(setSlot2(itemId));
      }
    }
  };

  const handleRemoveSlot = (slot: 1 | 2) => {
    if (slot === 1) {
      dispatch(setSlot1(null));
    } else {
      dispatch(setSlot2(null));
    }
  };

  const handleCraft = () => {
    if (canCraft) {
      dispatch(craftItem());
    }
  };

  const renderSlot = (slot: 1 | 2, item: typeof item1) => (
    <Box
      onDragOver={handleDragOver}
      onDrop={handleDrop(slot)}
      sx={{
        width: 100,
        height: 100,
        borderRadius: 3,
        border: item ? '2px solid #00ff9f' : '2px dashed rgba(255, 255, 255, 0.2)',
        background: item
          ? 'linear-gradient(135deg, rgba(0, 255, 159, 0.1) 0%, rgba(0, 255, 159, 0.02) 100%)'
          : 'rgba(255, 255, 255, 0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.2s ease',
      }}
    >
      {item ? (
        <>
          <ItemCard item={item} size="large" />
          <IconButton
            size="small"
            onClick={() => handleRemoveSlot(slot)}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              bgcolor: 'error.main',
              width: 24,
              height: 24,
              '&:hover': { bgcolor: 'error.dark' },
            }}
          >
            <Close sx={{ fontSize: 14, color: '#fff' }} />
          </IconButton>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
          <Add sx={{ fontSize: 32, opacity: 0.3 }} />
          <Typography variant="caption" display="block" sx={{ opacity: 0.5 }}>
            拖入装备
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
        装备合成台
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
        {renderSlot(1, item1)}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 28, color: 'text.secondary', fontWeight: 300 }}>+</Typography>
        </Box>

        {renderSlot(2, item2)}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 28, color: canCraft ? 'primary.main' : 'text.secondary', fontWeight: 300 }}>=</Typography>
        </Box>

        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: 3,
            border: canCraft ? '2px solid #ffcc00' : '2px dashed rgba(255, 255, 255, 0.1)',
            background: canCraft
              ? 'linear-gradient(135deg, rgba(255, 204, 0, 0.15) 0%, rgba(255, 204, 0, 0.05) 100%)'
              : 'rgba(255, 255, 255, 0.02)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: canCraft ? '0 0 30px rgba(255, 204, 0, 0.2)' : 'none',
          }}
        >
          {result ? (
            <ItemCard item={result} isAdvanced size="large" />
          ) : (
            <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5 }}>
              合成结果
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => dispatch(clearSlots())}
          disabled={!slot1 && !slot2}
        >
          清空
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AutoAwesome />}
          onClick={handleCraft}
          disabled={!canCraft}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            background: canCraft
              ? 'linear-gradient(135deg, #00ff9f 0%, #00cc7f 100%)'
              : undefined,
            '&:hover': {
              background: canCraft
                ? 'linear-gradient(135deg, #00ff9f 0%, #00ffaa 100%)'
                : undefined,
            },
          }}
        >
          {canCraft ? `合成 ${result?.name}` : '放入两个装备'}
        </Button>
      </Box>
    </Box>
  );
};

export default CraftArea;
