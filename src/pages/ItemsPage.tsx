import React, { useMemo, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  Divider,
  Stack,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InventoryIcon from '@mui/icons-material/Inventory2';

// =============== 数据定义 ===============
type ItemTier = 'base' | 'advanced';

interface ItemDef {
  id: string;
  name: string;
  tier: ItemTier;
  emoji: string;
  desc: string;
  recipe?: [string, string]; // 仅高级装备拥有，存放两个原料 id
}

const ITEM_DEFS: ItemDef[] = [
  // ---------- 基础装备 ----------
  { id: 'sword', name: '大剑', tier: 'base', emoji: '⚔️', desc: '增加 10 点攻击力' },
  { id: 'bow', name: '反曲弓', tier: 'base', emoji: '🏹', desc: '增加 10% 攻击速度' },
  { id: 'rod', name: '无用大棒', tier: 'base', emoji: '🪄', desc: '增加 10 点法术强度' },
  { id: 'tear', name: '女神之泪', tier: 'base', emoji: '💧', desc: '增加 15 点法力值' },
  { id: 'armor', name: '锁子甲', tier: 'base', emoji: '🛡️', desc: '增加 20 点护甲' },
  { id: 'cloak', name: '负极斗篷', tier: 'base', emoji: '🧥', desc: '增加 20 点魔抗' },
  { id: 'belt', name: '巨型腰带', tier: 'base', emoji: '🎽', desc: '增加 150 点生命值' },
  { id: 'glove', name: '拳套', tier: 'base', emoji: '🥊', desc: '增加 10% 暴击几率' },
  { id: 'spatula', name: '锅铲', tier: 'base', emoji: '🍳', desc: '神奇的厨房用具' },

  // ---------- 高级装备（合成） ----------
  { id: 'inf-edge', name: '无尽之刃', tier: 'advanced', emoji: '🗡️', desc: '暴击伤害提升 75%', recipe: ['sword', 'glove'] },
  { id: 'gaint-slayer', name: '巨人杀手', tier: 'advanced', emoji: '🪓', desc: '对高生命值目标造成额外伤害', recipe: ['sword', 'bow'] },
  { id: 'bt', name: '饮血剑', tier: 'advanced', emoji: '🩸', desc: '攻击附带生命偷取', recipe: ['sword', 'cloak'] },
  { id: 'rh', name: '狂徒铠甲', tier: 'advanced', emoji: '🦾', desc: '提供大量护甲并反伤', recipe: ['armor', 'armor'] },
  { id: 'gunblade', name: '海克斯枪刃', tier: 'advanced', emoji: '🔫', desc: '混合伤害与吸血', recipe: ['rod', 'sword'] },
  { id: 'morello', name: '莫雷洛秘典', tier: 'advanced', emoji: '📕', desc: '法伤附带重伤效果', recipe: ['rod', 'belt'] },
  { id: 'jg', name: '正义之手', tier: 'advanced', emoji: '✋', desc: '低血量时获得护盾', recipe: ['armor', 'rod'] },
  { id: 'shojin', name: '少女之心', tier: 'advanced', emoji: '💖', desc: '攻击回复法力', recipe: ['tear', 'sword'] },
  { id: 'blue', name: '蓝buff', tier: 'advanced', emoji: '💙', desc: '施法后获得法力', recipe: ['tear', 'rod'] },
  { id: 'qss', name: '水银饰带', tier: 'advanced', emoji: '🔱', desc: '免疫第一次控制', recipe: ['tear', 'cloak'] },
  // 二阶合成示例：使用高级装备作为原料
  { id: 'deathblade', name: '死亡之刃', tier: 'advanced', emoji: '⚡', desc: '终极暴击装备', recipe: ['inf-edge', 'shojin'] },
];

const ITEM_MAP: Record<string, ItemDef> = ITEM_DEFS.reduce((acc, it) => {
  acc[it.id] = it;
  return acc;
}, {} as Record<string, ItemDef>);

// 通过两个原料 id 查找可合成的高级装备
function findRecipe(a: string, b: string): ItemDef | undefined {
  return ITEM_DEFS.find(
    (it) =>
      it.tier === 'advanced' &&
      it.recipe &&
      ((it.recipe[0] === a && it.recipe[1] === b) || (it.recipe[0] === b && it.recipe[1] === a)),
  );
}

// =============== 合成树类型 ===============
interface CraftNode {
  itemId: string;
  children?: [CraftNode, CraftNode]; // 仅高级装备具备
}

interface SavedScheme {
  id: string;
  name: string;
  createdAt: number;
  tree: CraftNode;
}

const STORAGE_KEY = 'items_craft_schemes_v1';

// =============== 子组件：装备图标卡片 ===============
const ItemBadge: React.FC<{
  item: ItemDef;
  size?: number;
  onDragStart?: (e: React.DragEvent, id: string) => void;
  draggable?: boolean;
  onClick?: () => void;
  selected?: boolean;
}> = ({ item, size = 64, onDragStart, draggable, onClick, selected }) => {
  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {item.name}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block' }}>
            {item.desc}
          </Typography>
          {item.recipe && (
            <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#00ff9f' }}>
              配方：{ITEM_MAP[item.recipe[0]]?.name} + {ITEM_MAP[item.recipe[1]]?.name}
            </Typography>
          )}
        </Box>
      }
      arrow
    >
      <Box
        draggable={draggable}
        onDragStart={(e) => onDragStart && onDragStart(e, item.id)}
        onClick={onClick}
        sx={{
          width: size,
          height: size,
          borderRadius: 2,
          border: selected
            ? '2px solid #00ff9f'
            : item.tier === 'advanced'
            ? '2px solid #ffcc00'
            : '1px solid rgba(255,255,255,0.15)',
          background:
            item.tier === 'advanced'
              ? 'linear-gradient(135deg, rgba(255,204,0,0.15), rgba(0,255,159,0.05))'
              : 'rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: draggable ? 'grab' : onClick ? 'pointer' : 'default',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          userSelect: 'none',
          '&:hover': {
            transform: draggable || onClick ? 'translateY(-2px)' : 'none',
            boxShadow: draggable || onClick ? '0 4px 16px rgba(0,255,159,0.25)' : 'none',
          },
          '&:active': { cursor: draggable ? 'grabbing' : 'pointer' },
        }}
      >
        <Typography sx={{ fontSize: size * 0.45, lineHeight: 1 }}>{item.emoji}</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            fontSize: 10,
            fontWeight: 600,
            color: item.tier === 'advanced' ? '#ffcc00' : '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          {item.name}
        </Typography>
      </Box>
    </Tooltip>
  );
};

// =============== 子组件：合成槽位 ===============
const CraftSlot: React.FC<{
  itemId: string | null;
  onDrop: (id: string) => void;
  onClear: () => void;
  label: string;
}> = ({ itemId, onDrop, onClear, label }) => {
  const [hover, setHover] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setHover(true);
  };
  const handleDragLeave = () => setHover(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setHover(false);
    const id = e.dataTransfer.getData('text/plain');
    if (id) onDrop(id);
  };

  const item = itemId ? ITEM_MAP[itemId] : null;

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        width: 120,
        height: 120,
        borderRadius: 3,
        border: `2px dashed ${hover ? '#00ff9f' : 'rgba(255,255,255,0.2)'}`,
        background: hover ? 'rgba(0,255,159,0.08)' : 'rgba(255,255,255,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 0.2s ease',
      }}
    >
      {item ? (
        <>
          <ItemBadge item={item} size={84} />
          <IconButton
            size="small"
            onClick={onClear}
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
              backgroundColor: 'rgba(0,0,0,0.6)',
              '&:hover': { backgroundColor: 'rgba(255,0,0,0.6)' },
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </>
      ) : (
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', px: 1 }}>
          {label}
          <br />
          拖拽至此
        </Typography>
      )}
    </Box>
  );
};

// =============== 子组件：合成轨迹树 ===============
const CraftTreeView: React.FC<{ node: CraftNode; depth?: number }> = ({ node, depth = 0 }) => {
  const def = ITEM_MAP[node.itemId];
  if (!def) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* 当前节点 */}
      <Box sx={{ zIndex: 1 }}>
        <ItemBadge item={def} size={64} />
      </Box>

      {/* 子节点（向下展开） */}
      {node.children && (
        <>
          {/* 垂直连接线 */}
          <Box
            sx={{
              width: 2,
              height: 20,
              background: 'linear-gradient(to bottom, #00ff9f, rgba(0,255,159,0.2))',
            }}
          />
          {/* 水平连接线容器 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: 4,
              position: 'relative',
              pt: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '25%',
                right: '25%',
                height: 2,
                background: 'rgba(0,255,159,0.4)',
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 2,
                  height: 16,
                  background: 'rgba(0,255,159,0.4)',
                  mt: '-16px',
                }}
              />
              <CraftTreeView node={node.children[0]} depth={depth + 1} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 2,
                  height: 16,
                  background: 'rgba(0,255,159,0.4)',
                  mt: '-16px',
                }}
              />
              <CraftTreeView node={node.children[1]} depth={depth + 1} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

// =============== 主页面 ===============
const ItemsPage: React.FC = () => {
  const [slotA, setSlotA] = useState<string | null>(null);
  const [slotB, setSlotB] = useState<string | null>(null);
  const [resultTree, setResultTree] = useState<CraftNode | null>(null);
  const [selectedAdvancedId, setSelectedAdvancedId] = useState<string | null>(null);
  const [savedSchemes, setSavedSchemes] = useState<SavedScheme[]>([]);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; severity: 'success' | 'error' | 'info' }>({
    open: false,
    msg: '',
    severity: 'info',
  });

  // 加载本地保存的合成方案
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSavedSchemes(JSON.parse(raw));
    } catch (e) {
      console.warn('读取保存方案失败', e);
    }
  }, []);

  const persist = (list: SavedScheme[]) => {
    setSavedSchemes(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const baseItems = useMemo(() => ITEM_DEFS.filter((i) => i.tier === 'base'), []);
  const advancedItems = useMemo(() => ITEM_DEFS.filter((i) => i.tier === 'advanced'), []);

  // 拖拽起始
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  // 投放至槽位
  const dropToSlot = (slot: 'A' | 'B', id: string) => {
    if (slot === 'A') setSlotA(id);
    else setSlotB(id);
    setResultTree(null);
  };

  // 重置
  const handleReset = () => {
    setSlotA(null);
    setSlotB(null);
    setResultTree(null);
    setSelectedAdvancedId(null);
  };

  // 递归构建一个高级装备的完整合成树（默认基础料展开方式）
  const buildTreeFromAdvanced = (id: string): CraftNode => {
    const def = ITEM_MAP[id];
    if (!def || !def.recipe) {
      return { itemId: id };
    }
    return {
      itemId: id,
      children: [buildTreeFromAdvanced(def.recipe[0]), buildTreeFromAdvanced(def.recipe[1])],
    };
  };

  // 点击合成按钮
  const handleCraft = () => {
    if (!slotA || !slotB) {
      setSnack({ open: true, msg: '请将两件装备拖入合成槽', severity: 'error' });
      return;
    }
    const target = findRecipe(slotA, slotB);
    if (!target) {
      setSnack({ open: true, msg: '该组合无可合成的高级装备', severity: 'error' });
      return;
    }
    // 槽位中的原料如果本身是高级装备，要展开其合成树
    const tree: CraftNode = {
      itemId: target.id,
      children: [
        ITEM_MAP[slotA].tier === 'advanced' ? buildTreeFromAdvanced(slotA) : { itemId: slotA },
        ITEM_MAP[slotB].tier === 'advanced' ? buildTreeFromAdvanced(slotB) : { itemId: slotB },
      ],
    };
    setResultTree(tree);
    setSelectedAdvancedId(null);
    setSnack({ open: true, msg: `合成成功：${target.name}`, severity: 'success' });
  };

  // 选择高级装备 → 展示完整合成轨迹（不影响槽位）
  const handleSelectAdvanced = (id: string) => {
    setSelectedAdvancedId(id);
    setResultTree(buildTreeFromAdvanced(id));
  };

  // 保存当前方案
  const handleSave = () => {
    if (!resultTree) {
      setSnack({ open: true, msg: '当前没有可保存的合成方案', severity: 'error' });
      return;
    }
    const def = ITEM_MAP[resultTree.itemId];
    const scheme: SavedScheme = {
      id: `s_${Date.now()}`,
      name: `${def.name} 方案`,
      createdAt: Date.now(),
      tree: resultTree,
    };
    persist([scheme, ...savedSchemes]);
    setSnack({ open: true, msg: '方案已保存', severity: 'success' });
  };

  // 删除某个保存方案
  const handleDeleteScheme = (id: string) => {
    persist(savedSchemes.filter((s) => s.id !== id));
  };

  // 加载某个保存方案到展示区
  const handleLoadScheme = (s: SavedScheme) => {
    setResultTree(s.tree);
    setSelectedAdvancedId(s.tree.itemId);
    setSnack({ open: true, msg: `已载入：${s.name}`, severity: 'info' });
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 800, mb: 1 }}>
          装备合成工坊
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          拖拽两件基础装备至合成区，点击合成按钮生成高级装备；亦可在右侧选择高级装备查看完整合成轨迹。
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 左侧：基础装备区 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2.5, height: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <InventoryIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                基础装备
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2, display: 'block' }}>
              拖拽下方装备至合成区
            </Typography>
            <Grid container spacing={1.5}>
              {baseItems.map((item) => (
                <Grid key={item.id} size={{ xs: 4 }}>
                  <ItemBadge item={item} draggable onDragStart={handleDragStart} />
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }} />

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <AutoAwesomeIcon sx={{ color: 'secondary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                高级装备
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2, display: 'block' }}>
              点击查看合成轨迹（也可作为合成原料拖拽）
            </Typography>
            <Grid container spacing={1.5}>
              {advancedItems.map((item) => (
                <Grid key={item.id} size={{ xs: 4 }}>
                  <ItemBadge
                    item={item}
                    draggable
                    onDragStart={handleDragStart}
                    onClick={() => handleSelectAdvanced(item.id)}
                    selected={selectedAdvancedId === item.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* 中间：合成区 + 结果树 */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 2.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AutoAwesomeIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  合成区
                </Typography>
              </Stack>
              <Button
                size="small"
                startIcon={<RestartAltIcon />}
                onClick={handleReset}
                sx={{ color: 'text.secondary' }}
              >
                重置
              </Button>
            </Stack>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                py: 3,
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 2,
                mb: 2,
              }}
            >
              <CraftSlot
                itemId={slotA}
                onDrop={(id) => dropToSlot('A', id)}
                onClear={() => setSlotA(null)}
                label="原料 A"
              />
              <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 800 }}>
                +
              </Typography>
              <CraftSlot
                itemId={slotB}
                onDrop={(id) => dropToSlot('B', id)}
                onClear={() => setSlotB(null)}
                label="原料 B"
              />
            </Box>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<AutoAwesomeIcon />}
                onClick={handleCraft}
                sx={{ fontWeight: 700, color: '#000' }}
              >
                点击合成
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!resultTree}
              >
                保存方案
              </Button>
            </Stack>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 2 }} />

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <AccountTreeIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                合成轨迹
              </Typography>
              {resultTree && (
                <Chip
                  size="small"
                  label={ITEM_MAP[resultTree.itemId]?.name}
                  sx={{ ml: 1, backgroundColor: 'rgba(0,255,159,0.15)', color: 'primary.main' }}
                />
              )}
            </Stack>

            <Box
              sx={{
                minHeight: 240,
                p: 3,
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
              }}
            >
              {resultTree ? (
                <CraftTreeView node={resultTree} />
              ) : (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  暂无合成结果，请拖入装备并点击合成，或在左侧选择高级装备查看
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* 右侧：已保存方案 */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 2.5, height: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <SaveIcon sx={{ color: 'secondary.main' }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                已保存方案
              </Typography>
              <Chip size="small" label={savedSchemes.length} />
            </Stack>

            {savedSchemes.length === 0 ? (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                还未保存任何方案
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {savedSchemes.map((s) => {
                  const def = ITEM_MAP[s.tree.itemId];
                  return (
                    <Paper
                      key={s.id}
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderColor: 'rgba(255,255,255,0.08)',
                        '&:hover': { borderColor: 'primary.main' },
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease',
                      }}
                      onClick={() => handleLoadScheme(s)}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Typography sx={{ fontSize: 28 }}>{def?.emoji}</Typography>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
                            {s.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {new Date(s.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteScheme(s.id);
                          }}
                          sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Paper>
                  );
                })}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snack.open}
        autoHideDuration={2400}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled" sx={{ width: '100%' }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ItemsPage;
