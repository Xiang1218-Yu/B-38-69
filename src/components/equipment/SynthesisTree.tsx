import React from 'react';
import { Box, Typography, Collapse, IconButton, Tooltip } from '@mui/material';
import { ExpandMore as ExpandIcon, ExpandLess as CollapseIcon } from '@mui/icons-material';
import type { SynthesisTreeNode } from '../../data/equipmentData';
import { getItemById } from '../../data/equipmentData';

interface TreeNodeProps {
  node: SynthesisTreeNode;
  depth?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = React.useState(depth < 2);

  const hasChildren = node.children && node.children.length > 0;
  const item = getItemById(node.id);

  const tierLabel = node.tier === 'basic' ? '基础' : node.tier === 'combined' ? '合成' : '高级';
  const tierColor = node.tier === 'basic' ? '#4ecdc4' : node.tier === 'combined' ? '#fbbf24' : '#ff6b6b';

  return (
    <Box sx={{ ml: depth * 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          py: 0.8,
          px: 1.5,
          borderRadius: 2,
          backgroundColor: `${node.color}08`,
          border: `1px solid ${node.color}22`,
          '&:hover': {
            backgroundColor: `${node.color}15`,
            borderColor: `${node.color}44`,
          },
          transition: 'all 0.2s ease',
        }}
      >
        {hasChildren && (
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{
              width: 24,
              height: 24,
              color: 'rgba(255,255,255,0.4)',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {expanded ? <CollapseIcon sx={{ fontSize: 16 }} /> : <ExpandIcon sx={{ fontSize: 16 }} />}
          </IconButton>
        )}

        {!hasChildren && <Box sx={{ width: 24 }} />}

        <Typography sx={{ fontSize: '1.2rem', lineHeight: 1 }}>{node.icon}</Typography>

        <Typography sx={{ fontSize: '0.85rem', color: node.color, fontWeight: 700, flex: 1 }}>
          {node.name}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            px: 1,
            py: 0.2,
            borderRadius: 1,
            backgroundColor: `${tierColor}20`,
            color: tierColor,
            fontWeight: 700,
            fontSize: '0.6rem',
          }}
        >
          {tierLabel}
        </Typography>

        {item && (
          <Tooltip
            title={
              <Box>
                {item.stats.map((s, i) => (
                  <Typography key={i} variant="caption" sx={{ display: 'block', color: '#00ff9f' }}>
                    {s}
                  </Typography>
                ))}
              </Box>
            }
            arrow
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: node.color,
                cursor: 'help',
              }}
            />
          </Tooltip>
        )}
      </Box>

      {hasChildren && (
        <Collapse in={expanded} timeout="auto">
          <Box sx={{ position: 'relative', ml: 2.5 }}>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 12,
                width: 2,
                backgroundColor: `${node.color}33`,
                borderRadius: 1,
              }}
            />
            {node.children!.map((child, index) => (
              <Box key={`${child.id}-${index}`} sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 20,
                    width: 12,
                    height: 2,
                    backgroundColor: `${node.color}33`,
                  }}
                />
                <TreeNode node={child} depth={depth + 1} />
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

interface SynthesisTreeProps {
  tree: SynthesisTreeNode;
}

const SynthesisTree: React.FC<SynthesisTreeProps> = ({ tree }) => {
  return (
    <Box>
      <TreeNode node={tree} />
    </Box>
  );
};

export default SynthesisTree;
