import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
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

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ height: '100%' }}>
            <BaseItemPanel />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <CraftArea />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <SavedPlans />
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <SynthesisTree />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemCraftPage;
