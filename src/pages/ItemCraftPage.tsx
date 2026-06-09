import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import BaseItemPanel from '../components/BaseItemPanel';
import CraftArea from '../components/CraftArea';
import SynthesisTree from '../components/SynthesisTree';
import SavedPlans from '../components/SavedPlans';

const ItemCraftPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <AutoAwesome sx={{ fontSize: 32, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            装备合成模拟器
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
            拖拽基础装备进行合成，查看高级装备配方，保存你的合成方案
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 320px', minWidth: 320, maxWidth: { lg: 400 } }}>
          <Paper sx={{ height: '100%' }}>
            <BaseItemPanel />
          </Paper>
        </Box>

        <Box sx={{ flex: '2 1 500px', minWidth: 500, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper>
            <CraftArea />
          </Paper>

          <Paper>
            <SavedPlans />
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 100%' }}>
          <Paper>
            <SynthesisTree />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemCraftPage;
