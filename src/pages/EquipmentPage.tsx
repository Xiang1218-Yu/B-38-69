import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import BasicItemPanel from '../components/equipment/BasicItemPanel';
import SynthesisArea from '../components/equipment/SynthesisArea';
import SynthesisHistory from '../components/equipment/SynthesisHistory';
import AdvancedItemSelector from '../components/equipment/AdvancedItemSelector';
import SchemeManager from '../components/equipment/SchemeManager';

const EquipmentPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
          ⚗️ 装备合成工坊
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          拖拽基础装备至合成区域，探索无限合成可能
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <BasicItemPanel showCombined />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <SynthesisArea />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <SchemeManager />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <AdvancedItemSelector />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <SynthesisHistory />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EquipmentPage;
