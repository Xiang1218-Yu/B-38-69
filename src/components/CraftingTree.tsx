import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import type { Equipment } from '../data/equipment';
import { findRecipeForResult, getEquipmentById } from '../data/equipment';
import EquipmentItem from './EquipmentItem';

interface CraftingTreeProps {
  equipment: Equipment;
}

interface TreeNodeProps {
  equipment: Equipment;
  level?: number;
  isRoot?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ equipment, level = 0, isRoot = false }) => {
  const recipe = findRecipeForResult(equipment.id);
  const ingredients = recipe
    ? recipe.ingredients
        .map((id) => getEquipmentById(id))
        .filter((eq): eq is Equipment => eq !== undefined)
    : [];

  const hasChildren = ingredients.length > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          mb: hasChildren ? 3 : 0,
        }}
      >
        <EquipmentItem equipment={equipment} size={isRoot ? 'large' : 'small'} showName={true} />
        {isRoot && (
          <Chip
            label="目标装备"
            size="small"
            color="primary"
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              fontSize: '0.7rem',
            }}
          />
        )}
      </Box>

      {hasChildren && (
        <>
          <Box
            sx={{
              width: 2,
              height: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              mb: 1,
            }}
          />

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -17,
                left: '10%',
                right: '10%',
                height: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {ingredients.map((ingredient, index) => (
              <Box
                key={`${ingredient.id}-${index}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -17,
                    width: 2,
                    height: 17,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <TreeNode equipment={ingredient} level={level + 1} />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

const CraftingTree: React.FC<CraftingTreeProps> = ({ equipment }) => {
  const recipe = findRecipeForResult(equipment.id);

  if (!recipe) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <EquipmentItem equipment={equipment} size="large" showName />
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
          该装备为基础材料，无需合成
        </Typography>
      </Box>
    );
  }

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
        合成轨迹
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          '&::-webkit-scrollbar': {
            width: 6,
            height: 6,
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
        <TreeNode equipment={equipment} isRoot />
      </Box>

      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          所需材料：
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {recipe.ingredients.map((ingId, index) => {
            const eq = getEquipmentById(ingId);
            if (!eq) return null;
            return (
              <Chip
                key={`${ingId}-${index}`}
                label={`${eq.icon} ${eq.name}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.secondary',
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default CraftingTree;
