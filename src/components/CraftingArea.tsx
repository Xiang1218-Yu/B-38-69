import React, { useState } from 'react';
import { Box, Typography, Button, Alert, Snackbar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import type { Equipment } from '../data/equipment';
import { getEquipmentById, canCraft } from '../data/equipment';
import EquipmentItem from './EquipmentItem';

interface CraftingAreaProps {
  onCraft: (result: Equipment, ingredients: Equipment[]) => void;
}

const MAX_SLOTS = 4;

const CraftingArea: React.FC<CraftingAreaProps> = ({ onCraft }) => {
  const [slots, setSlots] = useState<(Equipment | null)[]>(Array(MAX_SLOTS).fill(null));
  const [isDragOver, setIsDragOver] = useState(false);
  const [resultPreview, setResultPreview] = useState<Equipment | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const updateResultPreview = (currentSlots: (Equipment | null)[]) => {
    const ingredients = currentSlots.filter((s): s is Equipment => s !== null);
    if (ingredients.length >= 2) {
      const recipe = canCraft(ingredients.map((i) => i.id));
      if (recipe) {
        const result = getEquipmentById(recipe.resultId);
        setResultPreview(result || null);
        return;
      }
    }
    setResultPreview(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const equipmentId = e.dataTransfer.getData('equipmentId');
    if (!equipmentId) return;

    const equipment = getEquipmentById(equipmentId);
    if (!equipment) return;

    const emptySlotIndex = slots.findIndex((s) => s === null);
    if (emptySlotIndex === -1) return;

    const newSlots = [...slots];
    newSlots[emptySlotIndex] = equipment;
    setSlots(newSlots);
    updateResultPreview(newSlots);
  };

  const handleSlotClick = (index: number) => {
    if (!slots[index]) return;

    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    updateResultPreview(newSlots);
  };

  const handleClear = () => {
    setSlots(Array(MAX_SLOTS).fill(null));
    setResultPreview(null);
  };

  const handleCraft = () => {
    const ingredients = slots.filter((s): s is Equipment => s !== null);
    const recipe = canCraft(ingredients.map((i) => i.id));

    if (recipe && resultPreview) {
      onCraft(resultPreview, ingredients);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      handleClear();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const ingredients = slots.filter((s): s is Equipment => s !== null);
  const canCraftNow = resultPreview !== null;

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}>
        合成台
      </Typography>

      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          border: isDragOver ? '2px dashed primary.main' : '2px dashed rgba(255, 255, 255, 0.15)',
          borderRadius: 3,
          p: 4,
          backgroundColor: isDragOver ? 'rgba(0, 255, 159, 0.05)' : 'transparent',
          transition: 'all 0.2s ease',
          minHeight: 300,
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          拖拽装备到下方槽位
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          }}
        >
          {slots.map((equipment, index) => (
            <Box
              key={index}
              onClick={() => handleSlotClick(index)}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: equipment ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: equipment ? 'rgba(255, 100, 100, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                  backgroundColor: equipment ? 'rgba(255, 100, 100, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              {equipment ? (
                <EquipmentItem equipment={equipment} size="small" showName={false} />
              ) : (
                <AddIcon sx={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: 32 }} />
              )}
            </Box>
          ))}
        </Box>

        {ingredients.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              =&gt;
            </Typography>
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: 2,
                border: resultPreview ? '2px solid rgba(255, 152, 0, 0.6)' : '2px dashed rgba(255, 255, 255, 0.1)',
                backgroundColor: resultPreview ? 'rgba(255, 152, 0, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: resultPreview ? '0 0 20px rgba(255, 152, 0, 0.3)' : 'none',
              }}
            >
              {resultPreview ? (
                <EquipmentItem equipment={resultPreview} size="medium" showName />
              ) : (
                <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
                  ???
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handleClear}
          disabled={ingredients.length === 0}
          sx={{ flex: 1 }}
        >
          清空
        </Button>
        <Button
          variant="contained"
          onClick={handleCraft}
          disabled={!canCraftNow}
          sx={{
            flex: 2,
            background: canCraftNow
              ? 'linear-gradient(135deg, #00ff9f 0%, #00b8ff 100%)'
              : undefined,
            '&:hover': {
              background: canCraftNow
                ? 'linear-gradient(135deg, #00e58f 0%, #00a5e5 100%)'
                : undefined,
            },
          }}
        >
          合成
        </Button>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          合成成功！
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" variant="filled">
          无法合成，请检查配方
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CraftingArea;
