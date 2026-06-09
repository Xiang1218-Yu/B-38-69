import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  FolderOpen as LoadIcon,
  ClearAll as ClearAllIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
  saveCurrentPlan,
  loadPlan,
  deletePlan,
  clearCraftedItems,
  removeCraftedItem,
} from '../store/itemCraftSlice';
import { getItemById } from '../data/items';
import ItemCard from './ItemCard';

const SavedPlans: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { craftedItems, savedPlans } = useSelector((state: RootState) => state.itemCraft);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [planName, setPlanName] = useState('');

  const handleSave = () => {
    if (planName.trim() && craftedItems.length > 0) {
      dispatch(saveCurrentPlan(planName.trim()));
      setPlanName('');
      setSaveDialogOpen(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
          当前合成方案
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            startIcon={<ClearAllIcon />}
            onClick={() => dispatch(clearCraftedItems())}
            disabled={craftedItems.length === 0}
          >
            清空
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={() => setSaveDialogOpen(true)}
            disabled={craftedItems.length === 0}
          >
            保存方案
          </Button>
        </Box>
      </Box>

      <Box sx={{ minHeight: 80, mb: 3 }}>
        {craftedItems.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 2,
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">拖拽基础装备到合成台开始合成</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {craftedItems.map((crafted) => {
              const result = getItemById(crafted.resultId);
              const comp1 = getItemById(crafted.components[0]);
              const comp2 = getItemById(crafted.components[1]);
              if (!result || !comp1 || !comp2) return null;
              return (
                <Box
                  key={crafted.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.5,
                    borderRadius: 2,
                    border: '1px solid rgba(255, 204, 0, 0.2)',
                    background: 'rgba(255, 204, 0, 0.05)',
                    position: 'relative',
                  }}
                >
                  <ItemCard item={comp1} size="small" />
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>+</Typography>
                  <ItemCard item={comp2} size="small" />
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>=</Typography>
                  <ItemCard item={result} isAdvanced size="small" />
                  <IconButton
                    size="small"
                    onClick={() => dispatch(removeCraftedItem(crafted.id))}
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: 'error.main',
                      width: 20,
                      height: 20,
                      '&:hover': { bgcolor: 'error.dark' },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 12, color: '#fff' }} />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
        已保存方案
        <Chip
          label={savedPlans.length}
          size="small"
          sx={{ ml: 1, bgcolor: 'primary.main', color: '#000', fontWeight: 600 }}
        />
      </Typography>

      {savedPlans.length === 0 ? (
        <Box
          sx={{
            p: 3,
            textAlign: 'center',
            borderRadius: 2,
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2">暂无保存的方案</Typography>
        </Box>
      ) : (
        <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {savedPlans.map((plan) => (
            <ListItem
              key={plan.id}
              sx={{
                borderRadius: 2,
                mb: 1,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' },
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontWeight: 500 }}>{plan.name}</Typography>
                    <Chip
                      label={`${plan.craftedItems.length}件装备`}
                      size="small"
                      sx={{ bgcolor: 'rgba(0, 255, 159, 0.15)', color: '#00ff9f', fontSize: 11 }}
                    />
                  </Box>
                }
                secondary={formatDate(plan.createdAt)}
              />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  onClick={() => dispatch(loadPlan(plan.id))}
                  sx={{ color: 'primary.main', mr: 1 }}
                >
                  <LoadIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => dispatch(deletePlan(plan.id))}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>保存合成方案</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="方案名称"
            fullWidth
            variant="outlined"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="例如：剑枪阵容装备"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>取消</Button>
          <Button onClick={handleSave} variant="contained" color="primary" disabled={!planName.trim()}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SavedPlans;
