import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, Tooltip } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addCraftScheme } from '../store/equipmentSlice';
import type { CraftScheme } from '../store/equipmentSlice';
import type { Equipment } from '../data/equipment';
import { legendaryEquipments } from '../data/equipment';
import EquipmentList from '../components/EquipmentList';
import CraftingArea from '../components/CraftingArea';
import CraftingTree from '../components/CraftingTree';
import CraftSchemeList from '../components/CraftSchemeList';

const CraftingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(legendaryEquipments[0]);
  const [lastCraftedResult, setLastCraftedResult] = useState<Equipment | null>(null);
  const [lastCraftedIngredients, setLastCraftedIngredients] = useState<Equipment[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [schemeName, setSchemeName] = useState('');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleEquipmentClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleCraft = (result: Equipment, ingredients: Equipment[]) => {
    setLastCraftedResult(result);
    setLastCraftedIngredients(ingredients);
    setSelectedEquipment(result);
  };

  const handleSelectScheme = (scheme: CraftScheme) => {
    setSelectedEquipment(scheme.resultEquipment);
  };

  const handleOpenSaveDialog = () => {
    if (lastCraftedResult) {
      setSchemeName(`${lastCraftedResult.name}合成方案`);
      setSaveDialogOpen(true);
    }
  };

  const handleSaveScheme = () => {
    if (lastCraftedResult && lastCraftedIngredients.length > 0 && schemeName.trim()) {
      dispatch(
        addCraftScheme({
          name: schemeName.trim(),
          resultEquipment: lastCraftedResult,
          ingredients: lastCraftedIngredients,
        })
      );
      setSaveDialogOpen(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    }
  };

  return (
    <Box sx={{ p: 3, height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          装备合成
        </Typography>
        <Tooltip title={lastCraftedResult ? '保存当前合成方案' : '请先合成装备'}>
          <span>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleOpenSaveDialog}
              disabled={!lastCraftedResult}
              sx={{
                background: lastCraftedResult
                  ? 'linear-gradient(135deg, #00ff9f 0%, #00b8ff 100%)'
                  : undefined,
              }}
            >
              保存方案
            </Button>
          </span>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          height: 'calc(100vh - 120px)',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ flex: '1 1 250px', minWidth: 250, height: '100%' }}>
          <EquipmentList onEquipmentClick={handleEquipmentClick} />
        </Box>

        <Box sx={{ flex: '1 1 250px', minWidth: 250, height: '100%' }}>
          <CraftingArea onCraft={handleCraft} />
        </Box>

        <Box sx={{ flex: '1 1 250px', minWidth: 250, height: '100%' }}>
          {selectedEquipment ? (
            <CraftingTree equipment={selectedEquipment} />
          ) : (
            <Box
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                p: 3,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                点击左侧装备查看合成轨迹
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: '1 1 250px', minWidth: 250, height: '100%' }}>
          <CraftSchemeList onSelectScheme={handleSelectScheme} />
        </Box>
      </Box>

      <Dialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(20, 20, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minWidth: 400,
          },
        }}
      >
        <DialogTitle>保存合成方案</DialogTitle>
        <DialogContent>
          {lastCraftedResult && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ fontSize: 48 }}>{lastCraftedResult.icon}</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {lastCraftedResult.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  材料: {lastCraftedIngredients.map((i) => i.name).join('、')}
                </Typography>
              </Box>
            </Box>
          )}
          <TextField
            autoFocus
            fullWidth
            value={schemeName}
            onChange={(e) => setSchemeName(e.target.value)}
            label="方案名称"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>取消</Button>
          <Button
            onClick={handleSaveScheme}
            variant="contained"
            disabled={!schemeName.trim()}
            sx={{
              background: schemeName.trim()
                ? 'linear-gradient(135deg, #00ff9f 0%, #00b8ff 100%)'
                : undefined,
            }}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSaveSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          方案已保存！
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CraftingPage;
