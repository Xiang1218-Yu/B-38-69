import React from 'react';
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction,
  Chip, Snackbar, Alert,
} from '@mui/material';
import { Save as SaveIcon, Delete as DeleteIcon, FolderOpen as LoadIcon, History as HistoryIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { saveScheme, deleteScheme, loadScheme, clearResults } from '../../store/equipmentSlice';
import type { RootState } from '../../store';
import { getItemById } from '../../data/equipmentData';

const SchemeManager: React.FC = () => {
  const dispatch = useDispatch();
  const results = useSelector((state: RootState) => state.equipment.results);
  const savedSchemes = useSelector((state: RootState) => state.equipment.savedSchemes);

  const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
  const [schemeName, setSchemeName] = React.useState('');
  const [loadDialogOpen, setLoadDialogOpen] = React.useState(false);
  const [toast, setToast] = React.useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({
    open: false, message: '', severity: 'success',
  });

  const handleSave = () => {
    if (!schemeName.trim()) return;
    if (results.length === 0) {
      setToast({ open: true, message: '没有可保存的合成结果', severity: 'error' });
      return;
    }
    dispatch(saveScheme({ name: schemeName.trim() }));
    setSchemeName('');
    setSaveDialogOpen(false);
    setToast({ open: true, message: '方案保存成功！', severity: 'success' });
  };

  const handleLoad = (schemeId: string) => {
    dispatch(loadScheme(schemeId));
    setLoadDialogOpen(false);
    setToast({ open: true, message: '方案加载成功！', severity: 'info' });
  };

  const handleDelete = (schemeId: string) => {
    dispatch(deleteScheme(schemeId));
    setToast({ open: true, message: '方案已删除', severity: 'info' });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
        💾 合成方案
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<SaveIcon />}
          onClick={() => setSaveDialogOpen(true)}
          disabled={results.length === 0}
          sx={{
            borderColor: 'rgba(0,255,159,0.3)',
            color: 'primary.main',
            '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(0,255,159,0.08)' },
            '&.Mui-disabled': { borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.2)' },
          }}
        >
          保存方案
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<LoadIcon />}
          onClick={() => setLoadDialogOpen(true)}
          sx={{
            borderColor: 'rgba(255,204,0,0.3)',
            color: 'secondary.main',
            '&:hover': { borderColor: 'secondary.main', backgroundColor: 'rgba(255,204,0,0.08)' },
          }}
        >
          加载方案
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<HistoryIcon />}
          onClick={() => dispatch(clearResults())}
          disabled={results.length === 0}
          sx={{
            borderColor: 'rgba(255,107,107,0.3)',
            color: '#ff6b6b',
            '&:hover': { borderColor: '#ff6b6b', backgroundColor: 'rgba(255,107,107,0.08)' },
            '&.Mui-disabled': { borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.2)' },
          }}
        >
          清空记录
        </Button>
      </Box>

      {results.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
            当前合成记录 ({results.length})
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {results.slice(0, 8).map((result, index) => {
              const item = getItemById(result.itemId);
              return item ? (
                <Chip
                  key={`${result.itemId}-${index}`}
                  icon={<span style={{ fontSize: '0.9rem' }}>{item.icon}</span>}
                  label={item.name}
                  size="small"
                  sx={{
                    backgroundColor: `${item.color}15`,
                    border: `1px solid ${item.color}33`,
                    color: item.color,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              ) : null;
            })}
            {results.length > 8 && (
              <Chip
                label={`+${results.length - 8}`}
                size="small"
                sx={{ color: 'text.secondary', fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </Box>
      )}

      {savedSchemes.length > 0 && (
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', mb: 1, display: 'block' }}>
            已保存方案 ({savedSchemes.length})
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {savedSchemes.slice(0, 5).map(scheme => (
              <Chip
                key={scheme.id}
                label={scheme.name}
                size="small"
                onClick={() => handleLoad(scheme.id)}
                sx={{
                  backgroundColor: 'rgba(255,204,0,0.08)',
                  border: '1px solid rgba(255,204,0,0.2)',
                  color: 'secondary.main',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(255,204,0,0.15)' },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Dialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'background.paper',
              backgroundImage: 'none',
              borderRadius: 3,
            },
          },
        }}
      >
        <DialogTitle sx={{ color: 'primary.main', fontWeight: 800 }}>保存合成方案</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="方案名称"
            value={schemeName}
            onChange={(e) => setSchemeName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            size="small"
            sx={{ mt: 1 }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
            将保存当前 {results.length} 条合成记录
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setSaveDialogOpen(false)} sx={{ color: 'text.secondary' }}>取消</Button>
          <Button
            onClick={handleSave}
            disabled={!schemeName.trim()}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #00ff9f, #00cc7f)',
              color: '#000',
              fontWeight: 800,
            }}
          >
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={loadDialogOpen}
        onClose={() => setLoadDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'background.paper',
              backgroundImage: 'none',
              borderRadius: 3,
              maxHeight: '70vh',
            },
          },
        }}
      >
        <DialogTitle sx={{ color: 'secondary.main', fontWeight: 800 }}>加载合成方案</DialogTitle>
        <DialogContent>
          {savedSchemes.length === 0 ? (
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 4 }}>
              暂无保存的方案
            </Typography>
          ) : (
            <List dense>
              {savedSchemes.map(scheme => (
                <ListItem
                  key={scheme.id}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(255,204,0,0.05)',
                      borderColor: 'rgba(255,204,0,0.2)',
                    },
                  }}
                  onClick={() => handleLoad(scheme.id)}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 700, color: 'secondary.main', fontSize: '0.9rem' }}>
                        {scheme.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                        {scheme.results.slice(0, 4).map((r, i) => {
                          const item = getItemById(r.itemId);
                          return item ? (
                            <Typography key={i} variant="caption" sx={{ color: item.color }}>
                              {item.icon} {item.name}
                            </Typography>
                          ) : null;
                        })}
                        {scheme.results.length > 4 && (
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            +{scheme.results.length - 4}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(scheme.id);
                      }}
                      sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: '#ff6b6b' } }}
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setLoadDialogOpen(false)} sx={{ color: 'text.secondary' }}>关闭</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ fontWeight: 700 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SchemeManager;
