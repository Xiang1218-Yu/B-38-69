import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import type { CraftScheme } from '../store/equipmentSlice';
import {
  removeCraftScheme,
  renameScheme,
  clearAllSchemes,
  selectScheme,
} from '../store/equipmentSlice';
import EquipmentItem from './EquipmentItem';

interface CraftSchemeListProps {
  onSelectScheme?: (scheme: CraftScheme) => void;
}

const CraftSchemeList: React.FC<CraftSchemeListProps> = ({ onSelectScheme }) => {
  const dispatch = useDispatch();
  const { craftSchemes, selectedSchemeId } = useSelector((state: RootState) => state.equipment);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteAllConfirmOpen, setDeleteAllConfirmOpen] = useState(false);
  const [schemeToDelete, setSchemeToDelete] = useState<string | null>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [schemeToRename, setSchemeToRename] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuSchemeId, setMenuSchemeId] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, schemeId: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuSchemeId(schemeId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuSchemeId(null);
  };

  const handleSelectScheme = (scheme: CraftScheme) => {
    dispatch(selectScheme(scheme.id));
    onSelectScheme?.(scheme);
  };

  const handleDeleteClick = (schemeId: string) => {
    setSchemeToDelete(schemeId);
    setDeleteConfirmOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (schemeToDelete) {
      dispatch(removeCraftScheme(schemeToDelete));
    }
    setDeleteConfirmOpen(false);
    setSchemeToDelete(null);
  };

  const handleDeleteAllConfirm = () => {
    dispatch(clearAllSchemes());
    setDeleteAllConfirmOpen(false);
  };

  const handleRenameClick = (schemeId: string) => {
    const scheme = craftSchemes.find((s) => s.id === schemeId);
    if (scheme) {
      setSchemeToRename(schemeId);
      setNewName(scheme.name);
      setRenameDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleRenameConfirm = () => {
    if (schemeToRename && newName.trim()) {
      dispatch(renameScheme({ id: schemeToRename, name: newName.trim() }));
    }
    setRenameDialogOpen(false);
    setSchemeToRename(null);
    setNewName('');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          合成方案
        </Typography>
        {craftSchemes.length > 0 && (
          <Tooltip title="清空所有方案">
            <IconButton
              size="small"
              onClick={() => setDeleteAllConfirmOpen(true)}
              sx={{ color: 'text.secondary' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
          },
        }}
      >
        {craftSchemes.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              color: 'text.disabled',
            }}
          >
            <SaveIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
            <Typography variant="body2">暂无保存的合成方案</Typography>
            <Typography variant="caption" sx={{ mt: 1 }}>
              成功合成后可保存方案
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {craftSchemes.map((scheme) => (
              <Box key={scheme.id} sx={{ position: 'relative', mb: 1 }}>
                <ListItemButton
                  selected={selectedSchemeId === scheme.id}
                  onClick={() => handleSelectScheme(scheme)}
                  sx={{
                    borderRadius: 1,
                    pr: 6,
                    backgroundColor:
                      selectedSchemeId === scheme.id
                        ? 'rgba(0, 255, 159, 0.08)'
                        : 'rgba(255, 255, 255, 0.02)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 255, 159, 0.08)',
                    },
                  }}
                >
                  <Box sx={{ mr: 2, flexShrink: 0 }}>
                    <EquipmentItem
                      equipment={scheme.resultEquipment}
                      size="small"
                      showName={false}
                    />
                  </Box>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                        {scheme.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {formatDate(scheme.createdAt)} · {scheme.ingredients.length}种材料
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                </ListItemButton>
                <Box
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, scheme.id);
                    }}
                    sx={{ color: 'text.secondary' }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </List>
        )}
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(20, 20, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <MenuItem onClick={() => handleRenameClick(menuSchemeId!)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          重命名
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(menuSchemeId!)} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          删除
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(20, 20, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <DialogTitle>确认删除</DialogTitle>
        <DialogContent>
          <DialogContentText>
            确定要删除这个合成方案吗？此操作不可撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>取消</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            删除
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteAllConfirmOpen}
        onClose={() => setDeleteAllConfirmOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(20, 20, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <DialogTitle>清空所有方案</DialogTitle>
        <DialogContent>
          <DialogContentText>
            确定要清空所有合成方案吗？此操作不可撤销。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAllConfirmOpen(false)}>取消</Button>
          <Button onClick={handleDeleteAllConfirm} color="error" variant="contained">
            清空
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={renameDialogOpen}
        onClose={() => setRenameDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(20, 20, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <DialogTitle>重命名方案</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            label="方案名称"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialogOpen(false)}>取消</Button>
          <Button onClick={handleRenameConfirm} variant="contained" disabled={!newName.trim()}>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CraftSchemeList;
