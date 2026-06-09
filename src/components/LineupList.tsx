import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography, CircularProgress, Divider, Fade } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLineups, appendLineups, setSortBy } from '../store';
import type { RootState } from '../store';
import LineupCard from './LineupCard';

const HERO_NAMES = [
  '阿兹尔', '卑尔维斯', '卡莎', '拉克丝', '赛图', '奎桑提', '亚索', '阿狸',
  '约里克', '格温', '慎', '嘉文四世', '莫德凯撒', '瑞兹', '希尔科', '霞'
];

const generateMockData = (startIndex: number, count: number) => {
  return Array(count).fill(null).map((_, i) => {
    const index = startIndex + i;
    const mainHeroName = HERO_NAMES[index % HERO_NAMES.length];
    return {
      id: (index + 1).toString(),
      title: `版本强势阵容 ${index + 1}：${index % 2 === 0 ? '极致爆发' : '运营至上'}`,
      author: { name: `高手${index + 1}`, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${index}` },
      rating: index % 4 === 0 ? 'SS' : 'S',
      difficulty: index % 3 === 0 ? '难' : '中',
      tags: index % 2 === 0 ? ['国服最卷', '大神推荐'] : ['最新', '上分首选'],
      synergies: [
        { name: '虚空', icon: '🌌', count: 8, level: 'chromatic' as const },
        { name: '法师', icon: '🧙', count: 4, level: 'gold' as const },
      ],
      coreHeroes: [
        { name: mainHeroName, icon: '/src/assets/hero1.png', items: ['⚔️', '🩸', '🏹'] },
      ],
      fullLineup: Array(8).fill(null).map((_, idx) => ({
        name: HERO_NAMES[(index + idx) % HERO_NAMES.length],
        icon: '/src/assets/hero2.png'
      })),
      heat: Math.floor(Math.random() * 10000),
      createdAt: Date.now() - Math.floor(Math.random() * 10000000)
    };
  });
};

const LineupList: React.FC = () => {
  const dispatch = useDispatch();
  const lineups = useSelector((state: RootState) => state.lineups.filteredLineups);
  const allLineups = useSelector((state: RootState) => state.lineups.lineups);
  const sortBy = useSelector((state: RootState) => state.lineups.sortBy);
  const filter = useSelector((state: RootState) => state.lineups.filter);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // Scroll to top when filter or sort changes
  useEffect(() => {
    const scrollContainer = document.getElementById('lineup-scroll-container');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  }, [filter, sortBy]);

  const observer = useRef<IntersectionObserver | null>(null);


  const handleSortChange = (newSort: "latest" | "hottest") => {
    if (newSort === sortBy) return;
    dispatch(setSortBy(newSort));
  };

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const currentLength = allLineups.length;
      if (currentLength >= 50) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      const moreData = generateMockData(currentLength, 10);
      dispatch(appendLineups(moreData));
      setLoading(false);
    }, 800);
  }, [allLineups.length, dispatch, hasMore, loading]);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        handleLoadMore();
      }
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, handleLoadMore]);

  useEffect(() => {
    // Only initialize data if the list is empty to prevent resetting during navigation
    if (allLineups.length === 0) {
      const initialData = generateMockData(0, 10);
      dispatch(setLineups(initialData));
    }

  }, [dispatch, allLineups.length]);

  const showLoading = loading;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
          共找到 <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>{lineups.length}</Box> 个阵容
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

          <Typography
            variant="caption"
            onClick={() => handleSortChange('latest')}
            sx={{
              color: sortBy === 'latest' ? 'primary.main' : 'text.secondary',
              cursor: 'pointer',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 1,
              transition: 'all 0.2s ease',
              '&:hover': { color: 'primary.main' }
            }}
          >
            最新发布
          </Typography>
          <Typography
            variant="caption"
            onClick={() => handleSortChange('hottest')}
            sx={{
              color: sortBy === 'hottest' ? 'primary.main' : 'text.secondary',
              cursor: 'pointer',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 1,
              transition: 'all 0.2s ease',
              '&:hover': { color: 'primary.main' }
            }}
          >
            全网最热
          </Typography>
        </Box>
      </Box>

      {/* Independent Scrollable Area */}
      <Box
        id="lineup-scroll-container"
        sx={{
          height: { xs: '65vh', md: '800px' },
          overflowY: 'auto',
          pr: { xs: 1, md: 2 },
          mr: { xs: -1, md: -2 },
          pb: 0,
          borderRadius: 4,
          boxShadow: '0 10px 40px -15px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.02)',
          position: 'relative',
          backgroundColor: 'background.default',
          '&::-webkit-scrollbar': { width: '6px' }, // Slightly thinner on mobile
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.08)', borderRadius: '10px' },
          '&::-webkit-scrollbar-thumb:hover': { background: 'primary.main' }
        }}
      >
        {/* Main Content Area with Bottom Buffer */}
        <Box sx={{ position: 'relative', pt: { xs: 2.5, md: 3 }, pb: 12 }}>
          {lineups.map((lineup) => (
            <LineupCard key={lineup.id} lineup={lineup} />
          ))}

          {/* Sentinel & Loading UI - Always prioritzed over Empty State */}
          <Box ref={lastElementRef} sx={{
            minHeight: showLoading ? '140px' : (hasMore ? '40px' : '0px'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2
          }}>
            {showLoading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, backgroundColor: 'rgba(0,0,0,0.4)', px: 4, py: 2, borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
                <CircularProgress size={20} color="primary" thickness={5} />
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 1 }}>
                  {filter.search ? '搜索中...' : '正在加载更多高胜率阵容...'}
                </Typography>
              </Box>
            )}
          </Box>

          {!hasMore && lineups.length > 0 && !showLoading && (
            <Box sx={{ py: 6, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary', opacity: 0.4 }}>
                <Divider sx={{ flexGrow: 1, borderColor: 'rgba(255,255,255,0.05)' }} />
                <Typography variant="caption" sx={{ letterSpacing: 3, fontWeight: 800 }}>
                  已探索完整阵容库
                </Typography>
                <Divider sx={{ flexGrow: 1, borderColor: 'rgba(255,255,255,0.05)' }} />
              </Box>
            </Box>
          )}

          {/* Empty State - Only shown if NOT loading AND length is 0 */}
          {lineups.length === 0 && !showLoading && (
            <Fade in={true} timeout={600}>
              <Box sx={{
                textAlign: 'center',
                py: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                opacity: 0.8
              }}>
                <Box component="span" sx={{ fontSize: 64, opacity: 0.2 }}>🔍</Box>
                <Box>
                  <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
                    未找到匹配阵容
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 300, mx: 'auto' }}>
                    尝试换个关键词，或者切换一下版本、评级标签来寻找灵感
                  </Typography>
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LineupList;
