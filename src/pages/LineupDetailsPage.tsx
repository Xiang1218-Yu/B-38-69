import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Paper, Divider, Avatar, Chip, Snackbar } from '@mui/material';
import { ArrowBack as BackIcon, Share as ShareIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteEmptyIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/lineupSlice';
import type { RootState } from '../store';

const ITEM_NAMES: Record<string, string> = {
  '⚔️': '无尽之刃',
  '🩸': '饮血剑',
  '🏹': '最后的轻语',
  '👕': '棘刺背心',
  '🧣': '龙牙',
  '🛡️': '石像鬼板甲',
  '🧪': '速度药剂',
  '📖': '莫雷洛秘典',
  '🔵': '蓝霸符',
  '🔴': '红霸符',
  '👔': '救赎'
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'bronze': return '#ad5600';
    case 'silver': return '#b0b0b0';
    case 'gold': return '#ffcc00';
    case 'chromatic': return 'linear-gradient(135deg, #00ff9f 0%, #00bfff 100%)';
    default: return 'rgba(255,255,255,0.1)';
  }
};

const LineupDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lineup = useSelector((state: RootState) =>
    state.lineups.lineups.find(l => l.id === id)
  );
  const isFavorite = useSelector((state: RootState) =>
    state.lineups.favorites.includes(id || '')
  );
  const [shareOpen, setShareOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleToggleFavorite = () => {
    if (id) {
      dispatch(toggleFavorite(id));
    }
  };

  const handleShareClick = () => {
    setShareOpen(true);
    // In a real app, you would use navigator.clipboard.writeText here
  };

  const handleCloseShare = () => {
    setShareOpen(false);
  };

  if (!lineup) {
    return (
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 10
      }}>
        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 700 }}>未找到该阵容信息</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 3, px: 4, borderRadius: 2 }}
        >
          返回首页推荐
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.primary' }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>阵容详情</Typography>
      </Box>

      <Paper sx={{ p: 4, backgroundColor: 'background.paper', borderRadius: 4 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'flex-start' },
          gap: 3,
          mb: 4
        }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Box sx={{
                px: 2, py: 0.5, borderRadius: 1,
                background: lineup.rating === 'SS' ? 'linear-gradient(135deg, #ffcc00 0%, #ff6600 100%)' : 'rgba(255,255,255,0.1)',
                color: lineup.rating === 'SS' ? 'black' : 'white',
                fontWeight: 900,
                fontSize: { xs: '0.8rem', sm: '1rem' }
              }}>
                {lineup.rating} 级阵容
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>{lineup.title}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={lineup.author.avatar} sx={{ width: 24, height: 24 }} />
                <Typography variant="body2">{lineup.author.name}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 0, display: { xs: 'none', sm: 'block' } }} />
              <Typography variant="caption" color="text.secondary">发布于 1小时前</Typography>
              <Chip label={lineup.difficulty} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
            </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 1.5,
            width: 'auto',
            mt: { xs: 1, sm: 0 }
          }}>
            <Button
              variant={isFavorite ? "contained" : "outlined"}
              color={isFavorite ? "primary" : "inherit"}
              onClick={handleToggleFavorite}
              sx={{
                borderColor: isFavorite ? 'primary.main' : 'rgba(255,255,255,0.2)',
                color: isFavorite ? 'black' : 'white',
                minWidth: { xs: 44, md: 100 },
                width: { xs: 44, md: 'auto' },
                height: { xs: 44, md: 'auto' },
                borderRadius: 1,
                px: { xs: 0, md: 2 }
              }}
            >
              {isFavorite ? <FavoriteIcon sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} /> : <FavoriteEmptyIcon sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }} />}
              <Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, ml: 1, whiteSpace: 'nowrap' }}>
                {isFavorite ? '已收藏' : '收藏'}
              </Box>
            </Button>
            <Button
              variant="contained"
              onClick={handleShareClick}
              sx={{
                minWidth: { xs: 44, md: 110 },
                width: { xs: 44, md: 'auto' },
                height: { xs: 44, md: 'auto' },
                borderRadius: 1,
                px: { xs: 0, md: 2 }
              }}
            >
              <ShareIcon sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }} />
              <Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, ml: 1, whiteSpace: 'nowrap' }}>
                分享阵容
              </Box>
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 4, opacity: 0.1 }} />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 6 } }}>
          <Box>
            <Typography variant="h6" sx={{ mb: { xs: 2, md: 3 }, color: 'primary.main', fontWeight: 700 }}>羁绊构成</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {lineup.synergies.map((syn) => (
                <Box
                  key={syn.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    border: '1px solid',
                    borderColor: 'transparent',
                    background: getLevelColor(syn.level),
                    WebkitBackgroundClip: syn.level === 'chromatic' ? 'border-box' : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      zIndex: 0
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ zIndex: 1, position: 'relative', fontSize: '1.2rem' }}>{syn.icon}</Typography>
                  <Box sx={{ zIndex: 1, position: 'relative' }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'white', lineHeight: 1, fontSize: '0.85rem' }}>{syn.name}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.6)', lineHeight: 1, fontSize: '0.75rem' }}>{syn.count}层</Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: syn.level === 'chromatic' ? getLevelColor(syn.level) : getLevelColor(syn.level),
                      opacity: 1,
                      zIndex: 1
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: { xs: 2, md: 3 }, color: 'primary.main', fontWeight: 700 }}>阵容英雄</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2.5, md: 3.5 } }}>
              {lineup.fullLineup.map((hero, idx) => (
                <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    src={hero.icon}
                    variant="rounded"
                    sx={{
                      width: { xs: 52, md: 64 },
                      height: { xs: 52, md: 64 },
                      border: '2px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'default',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      textAlign: 'center'
                    }}
                  >
                    {hero.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Typography variant="h6" sx={{ mb: { xs: 2, md: 3 }, color: 'primary.main', fontWeight: 700 }}>装备规划</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 4 } }}>
            {lineup.coreHeroes.map((hero, idx) => (
              <Box key={idx} sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.03)', flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar src={hero.icon} variant="rounded" sx={{ width: 48, height: 48 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{hero.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2.5 }}>
                  {hero.items?.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
                      <Box sx={{
                        width: 36, height: 36,
                        backgroundColor: '#1a1a2e',
                        border: '2px solid #ffcc00',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffcc00',
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        boxShadow: '0 0 10px rgba(255, 204, 0, 0.2)',
                        cursor: 'default'
                      }}>
                        {item}
                      </Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {ITEM_NAMES[item] || item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={shareOpen}
        autoHideDuration={2000}
        onClose={handleCloseShare}
        message="已复制分享链接，快分享给游戏好友吧！"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          top: '50% !important',
          left: '50% !important',
          transform: 'translate(-50%, -50%)',
          zIndex: 2000,
          width: 'fit-content'
        }}
        slotProps={{
          content: {
            sx: {
              backgroundColor: 'primary.main',
              color: 'black',
              fontWeight: 800,
              borderRadius: 2,
              px: { xs: 3, sm: 4 },
              py: 1.5,
              boxShadow: 'none',
              minWidth: 0,
              width: 'fit-content',
              maxWidth: 'calc(100vw - 48px)',
              '& .MuiSnackbarContent-message': {
                width: '100%',
                textAlign: 'center',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                whiteSpace: { xs: 'normal', sm: 'nowrap' }
              }
            }
          }
        }}
      />
    </Box>
  );
};

export default LineupDetailsPage;
