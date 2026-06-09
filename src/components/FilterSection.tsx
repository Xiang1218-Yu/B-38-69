import React from 'react';
import { Box, Tabs, Tab, Button, TextField, InputAdornment, ButtonGroup, Typography, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store';
import type { RootState } from '../store';

const FilterSection: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.lineups.filter);
  const version = useSelector((state: RootState) => state.lineups.currentVersion);

  const categories = ['全部', '国服最卷', '大神推荐', '最新', '上分首选'];
  const ratings = ['全部', 'SS', 'S', 'A', 'B'];

  return (
    <Box sx={{ mb: 4 }}>
      {/* Banner */}
      <Box
        sx={{
          height: { xs: 120, md: 180 },
          width: '100%',
          borderRadius: 3,
          mb: 4,
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(45deg, #1e1e32 30%, #161625 90%)',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 3, md: 6 },
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          transform: 'translateY(-6px)',
        }}
      >
        <Box sx={{ zIndex: 1, maxWidth: { xs: '100%', md: '60%' } }}>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 0.5, fontSize: { xs: '1.25rem', md: '2.125rem' } }}>
            版本 {version} 最强阵容推荐
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', md: '1rem' } }}>
            最新、最全、最稳的云顶之弈上分阵容，助你轻松登顶！
          </Typography>
        </Box>
        <Box
          component="img"
          src="/src/assets/banner.png"
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            zIndex: 0,
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
          }}
        />
      </Box>

      {/* Tabs and Filters */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Tabs
            value={categories.indexOf(filter.category)}
            onChange={(_, val) => dispatch(setFilter({ category: categories[val] }))}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ maxWidth: { xs: '100vw', md: 'auto' }, mb: { xs: 1, md: 0 } }}
          >
            {categories.map((cat) => (
              <Tab key={cat} label={cat} sx={{ minWidth: { xs: 80, md: 100 } }} />
            ))}
          </Tabs>

          <TextField
            placeholder="搜索阵容或英雄"
            size="small"
            value={filter.search}
            onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
            sx={{
              width: { xs: '100%', md: 320 },
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': { border: 'none' },
              }
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: filter.search && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => dispatch(setFilter({ search: '' }))}
                      sx={{ color: 'text.secondary', p: 0.5 }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            评级筛选：
          </Typography>
          <ButtonGroup size="small">
            {ratings.map((r) => (
              <Button
                key={r}
                onClick={() => dispatch(setFilter({ rating: r }))}
                variant={filter.rating === r ? 'contained' : 'outlined'}
                sx={{
                  border: filter.rating === r ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: filter.rating === r ? 'black' : 'white',
                  px: { xs: 2.5, md: 3.5 },
                }}
              >
                {r}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
