import React from 'react';
import { Box, Card, Typography, Avatar, Tooltip, Button } from '@mui/material';
import { ArrowForwardIos as ArrowIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Lineup } from '../store/lineupSlice';

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

interface Props {
  lineup: Lineup;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'bronze': return '#ad5600';
    case 'silver': return '#b0b0b0';
    case 'gold': return '#ffcc00';
    case 'chromatic': return 'linear-gradient(135deg, #00ff9f 0%, #00bfff 100%)';
    default: return 'rgba(255,255,255,0.1)';
  }
};

const LineupCard: React.FC<Props> = ({ lineup }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/lineup/${lineup.id}`)}
      sx={{
        p: { xs: 1.5, md: 2.5 },
        mb: 1.5,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, md: 3 }, alignItems: 'stretch' }}>
        {/* Rating and Title Area */}
        <Box sx={{ width: { xs: '100%', md: '300px' }, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, md: 1.5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
              <Box
                sx={{
                  width: { xs: 36, md: 44 },
                  height: { xs: 36, md: 44 },
                  borderRadius: '6px',
                  background: lineup.rating === 'SS' ? 'linear-gradient(135deg, #ffcc00 0%, #ff6600 100%)' : 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: lineup.rating === 'SS' ? 'black' : 'white',
                  flexShrink: 0
                }}
              >
                {lineup.rating}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" noWrap sx={{ color: 'white', mb: 0.2, fontWeight: 700, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                  {lineup.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar src={lineup.author.avatar} sx={{ width: 16, height: 16 }} />
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      color: 'text.secondary',
                      maxWidth: { xs: 120, md: 150 },
                      fontSize: '0.7rem'
                    }}
                  >
                    {lineup.author.name} · {lineup.difficulty}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* Arrow for Mobile Mobile (Top Right for space) */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1, flexShrink: 0 }}>
              <ArrowIcon sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.2)' }} />
            </Box>
          </Box>
        </Box>

        {/* Data Sections Row (Synergies, Items, Full Lineup) */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          gap: { xs: 3, md: 5 },
          flex: 1,
          width: { xs: '100%', md: 'auto' },
          alignItems: 'flex-start',
          minWidth: 0
        }}>
          {/* Main Synergies */}
          <Box sx={{ flexShrink: 0 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem', display: 'none', mb: 1, whiteSpace: 'nowrap' }}>
              核心羁绊
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', maxWidth: { xs: '70px', sm: '100px', md: 'none' } }}>
              {lineup.synergies.slice(0, 3).map((syn) => (
                <Tooltip key={syn.name} title={`${syn.name}: ${syn.count}层`} arrow>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: { xs: 0.8, md: 1.25 },
                      py: 0.5,
                      borderRadius: 1.5,
                      background: getLevelColor(syn.level),
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        zIndex: 0
                      }
                    }}
                  >
                    <Typography fontSize={{ xs: '0.7rem', md: '0.9rem' }} sx={{ zIndex: 1, position: 'relative' }}>{syn.icon}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'white', zIndex: 1, position: 'relative', fontSize: '0.7rem', ml: 0.5 }}>{syn.count}</Typography>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: getLevelColor(syn.level),
                        zIndex: 1
                      }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>

          {/* Core Heroes Area */}
          <Box sx={{ flexShrink: 0, minWidth: 0 }}>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, display: 'none', mb: { xs: 1, md: 2 }, fontSize: { xs: '0.65rem', md: '0.75rem' }, whiteSpace: 'nowrap' }}>
              关键装备
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 3 }, overflow: 'visible' }}>
              {lineup.coreHeroes.slice(0, 2).map((hero, idx) => (
                <Box key={idx} sx={{ position: 'relative' }}>
                  <Tooltip title={hero.name} arrow placement="right">
                    <Box sx={{ position: 'relative', width: { xs: 34, md: 56 }, height: { xs: 34, md: 56 } }}>
                      <Avatar
                        src={hero.icon}
                        variant="rounded"
                        sx={{
                          width: '100%',
                          height: '100%',
                          border: '1.5px solid',
                          borderColor: 'secondary.main',
                        }}
                      />
                      <Box sx={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.2, zIndex: 2 }}>
                        {hero.items?.slice(0, 3).map((item, i) => (
                          <Tooltip key={i} title={ITEM_NAMES[item] || item} arrow placement="bottom">
                            <Box sx={{
                              width: { xs: 11, md: 18 }, height: { xs: 11, md: 18 },
                              backgroundColor: '#1a1a2e',
                              border: '1px solid #ffcc00',
                              borderRadius: '2px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffcc00',
                              fontSize: { xs: '0.4rem', md: '0.65rem' },
                              fontWeight: 900
                            }}>
                              {item}
                            </Box>
                          </Tooltip>
                        ))}
                      </Box>
                    </Box>
                  </Tooltip>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Full Lineup Area */}
          <Box sx={{ flex: 1, minWidth: 0, ml: { xs: 1, md: 0 } }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'none', mb: 1, fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
              完整阵容 ({lineup.fullLineup.length}人)
            </Typography>
            <Box sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: 1,
              overflowX: 'auto',
              py: '4px',
              mt: '-4px',
              pb: { xs: 1, md: '4px' },
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
              width: '100%',
              maxWidth: '100vw'
            }}>
              {lineup.fullLineup.map((hero, idx) => (
                <Tooltip key={idx} title={hero.name} arrow>
                  <Avatar
                    src={hero.icon}
                    variant="rounded"
                    sx={{
                      width: { xs: 28, md: 32 },
                      height: { xs: 28, md: 32 },
                      flexShrink: 0,
                      border: '1px solid rgba(255,255,255,0.1)',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        zIndex: 2
                      },
                      transition: 'all 0.2s ease'
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Desktop View Details Button (Replaces simple arrow) */}
        <Box sx={{
          alignSelf: 'center',
          ml: 'auto',
          pl: 2,
          display: { xs: 'none', md: 'flex' },
          flexShrink: 0
        }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: 'text.secondary',
              fontSize: '0.75rem',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
                backgroundColor: 'rgba(0, 255, 159, 0.05)'
              }
            }}
          >
            查看详情
          </Button>
        </Box>
      </Box >
    </Card >
  );
};

export default LineupCard;
