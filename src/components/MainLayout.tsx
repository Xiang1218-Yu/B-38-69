import React, { useState } from 'react';
import { Box, Typography, Link, Dialog, DialogTitle, DialogContent, IconButton, useMediaQuery, useTheme, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [modalData, setModalData] = useState<{ open: boolean; title: string; content: string }>({
    open: false,
    title: '',
    content: ''
  });

  const footerLinks = [
    {
      label: '关于我们',
      title: '关于 GameAssist',
      content: 'GameAssist 致力于为广大游戏爱好者提供最专业、最及时的阵容推荐与数据分析服务。我们是一群热爱游戏的开发者，希望能让每个玩家都能轻松登顶。'
    },
    {
      label: '免责声明',
      title: '免责条款',
      content: '本站所有阵容数据均来源于游戏版本分析与社区推荐，仅供学习参考，不保证任何竞技结果。游戏内数据以官方版本为准。请合理安排游戏时间，享受健康生活。'
    },
    {
      label: '加入我们',
      title: '招贤纳士',
      content: '如果你对游戏充满热情，且具备前端开发、数据爬取或内容运营经验，欢迎发送简历至 join@gameassist.ai，期待与你并肩作战！'
    },
    {
      label: '商务合作',
      title: '商务合作',
      content: '如有广告投放、数据接口对接或品牌合作需求，请联系：biz@gameassist.ai。我们将于 24 小时内给予回复。'
    },
  ];

  const handleOpenModal = (item: typeof footerLinks[0]) => {
    setModalData({ open: true, title: item.title, content: item.content });
  };

  const handleCloseModal = () => {
    setModalData({ ...modalData, open: false });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Sidebar for Desktop */}
      {!isMobile && <Sidebar />}

      {/* Sidebar for Mobile (Drawer) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 80, backgroundColor: '#050508', borderRight: '1px solid rgba(255, 255, 255, 0.04)' },
        }}
      >
        <Sidebar onClose={handleDrawerToggle} />
      </Drawer>

      <Box sx={{
        flex: 1,
        ml: isMobile ? 0 : '80px',
        display: 'flex',
        flexDirection: 'column',
        width: isMobile ? '100%' : `calc(100% - 80px)`,
        minWidth: 0
      }}>
        <Header onMenuClick={handleDrawerToggle} isMobile={isMobile} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 4,
            pb: 10,
            maxWidth: 1400,
            mx: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Outlet />
        </Box>

        {/* Footer */}
        <Box sx={{ p: 4, mt: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap', mb: 2 }}>
            {footerLinks.map((item) => (
              <Link
                key={item.label}
                component="button"
                onClick={() => handleOpenModal(item)}
                underline="none"
                color="text.secondary"
                sx={{ fontSize: '0.875rem', '&:hover': { color: 'primary.main' }, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {item.label}
              </Link>
            ))}
          </Box>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2024 GameAssist. All Rights Reserved. 游戏助手 版权所有
          </Typography>
        </Box>
      </Box>

      {/* Reusable Dialog */}
      <Dialog
        open={modalData.open}
        onClose={handleCloseModal}
        fullWidth={isMobile}
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'background.paper',
              backgroundImage: 'none',
              borderRadius: 3,
              p: { xs: 1, sm: 2 },
              mx: { xs: 2, sm: 0 },
              minWidth: { xs: 'auto', sm: 500 },
              minHeight: { xs: 'auto', sm: 320 },
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'none'
            }
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, px: { xs: 2, sm: 3 } }}>
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ color: 'primary.main', fontWeight: 800 }}>
            {modalData.title}
          </Typography>
          <IconButton onClick={handleCloseModal} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: { xs: 1, sm: 3 }, px: { xs: 2, sm: 3 }, flexGrow: 1 }}>
          <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
            {modalData.content}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MainLayout;
