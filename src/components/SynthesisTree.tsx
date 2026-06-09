import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import type { SynthesisTreeNode } from '../store/itemCraftSlice';
import { selectAdvancedItem } from '../store/itemCraftSlice';
import { getItemById, advancedItems } from '../data/items';
import ItemCard from './ItemCard';

interface TreeNodeProps {
  node: SynthesisTreeNode;
  isRoot?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, isRoot = false }) => {
  const item = getItemById(node.itemId);
  const selectedId = useSelector((state: RootState) => state.itemCraft.selectedAdvancedItemId);
  const isSelected = selectedId === node.itemId;

  if (!item) return null;

  const hasChildren = node.children && node.children.length === 2;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {hasChildren && (
        <Box sx={{ display: 'flex', gap: 4, mb: 1, position: 'relative' }}>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                top: -16,
                left: '50%',
                width: 2,
                height: 16,
                bgcolor: 'rgba(255, 204, 0, 0.4)',
                transform: 'translateX(-50%)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: -16,
                left: '50%',
                width: 'calc(100% + 32px)',
                height: 2,
                bgcolor: 'rgba(255, 204, 0, 0.4)',
                transform: 'translateX(-50%)',
              }}
            />
            <TreeNode node={node.children![0]} />
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                top: -16,
                left: '50%',
                width: 2,
                height: 16,
                bgcolor: 'rgba(255, 204, 0, 0.4)',
                transform: 'translateX(-50%)',
              }}
            />
            <TreeNode node={node.children![1]} />
          </Box>
        </Box>
      )}
      <Box sx={{ position: 'relative' }}>
        {hasChildren && (
          <Box
            sx={{
              position: 'absolute',
              top: -16,
              left: '50%',
              width: 2,
              height: 16,
              bgcolor: 'rgba(255, 204, 0, 0.4)',
              transform: 'translateX(-50%)',
            }}
          />
        )}
        <ItemCard
          item={item}
          isAdvanced={!node.isBase}
          selected={isSelected && !isRoot}
          size={isRoot ? 'large' : 'small'}
        />
      </Box>
    </Box>
  );
};

const SynthesisTree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { synthesisTree, selectedAdvancedItemId } = useSelector(
    (state: RootState) => state.itemCraft
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main', fontWeight: 600 }}>
        高级装备图鉴
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
          点击装备查看合成轨迹
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {advancedItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isAdvanced
              selected={selectedAdvancedItemId === item.id}
              size="small"
              onClick={() => {
                if (selectedAdvancedItemId === item.id) {
                  dispatch(selectAdvancedItem(null));
                } else {
                  dispatch(selectAdvancedItem(item.id));
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {synthesisTree && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            border: '1px solid rgba(255, 204, 0, 0.2)',
            background: 'linear-gradient(180deg, rgba(255, 204, 0, 0.05) 0%, transparent 100%)',
            overflowX: 'auto',
          }}
        >
          <Typography variant="subtitle2" sx={{ color: 'secondary.main', mb: 2, textAlign: 'center', display: 'block', width: '100%' }}>
            合成轨迹树
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
            <TreeNode node={synthesisTree} isRoot />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SynthesisTree;
