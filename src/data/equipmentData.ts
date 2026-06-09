export type ItemTier = 'basic' | 'combined' | 'advanced';

export interface EquipmentItem {
  id: string;
  name: string;
  icon: string;
  tier: ItemTier;
  description: string;
  stats: string[];
  color: string;
}

export interface SynthesisRecipe {
  result: string;
  ingredients: [string, string];
}

export interface SynthesisTreeNode {
  id: string;
  name: string;
  icon: string;
  tier: ItemTier;
  color: string;
  children?: SynthesisTreeNode[];
}

export const BASIC_ITEMS: EquipmentItem[] = [
  { id: 'sword', name: '长剑', icon: '⚔️', tier: 'basic', description: '基础攻击力装备', stats: ['攻击力 +10'], color: '#ff6b6b' },
  { id: 'vest', name: '锁子甲', icon: '🛡️', tier: 'basic', description: '基础护甲装备', stats: ['护甲 +20'], color: '#4ecdc4' },
  { id: 'cloak', name: '斗篷', icon: '🧥', tier: 'basic', description: '基础魔抗装备', stats: ['魔抗 +20'], color: '#a78bfa' },
  { id: 'belt', name: '巨人腰带', icon: '🎗️', tier: 'basic', description: '基础生命值装备', stats: ['生命值 +200'], color: '#f97316' },
  { id: 'tear', name: '女神之泪', icon: '💧', tier: 'basic', description: '基础法力值装备', stats: ['法力值 +150'], color: '#60a5fa' },
  { id: 'rod', name: '无用大棒', icon: '🪄', tier: 'basic', description: '基础法术强度装备', stats: ['法术强度 +20'], color: '#f472b6' },
  { id: 'bow', name: '反曲之弓', icon: '🏹', tier: 'basic', description: '基础攻速装备', stats: ['攻速 +15%'], color: '#34d399' },
  { id: 'glove', name: '拳套', icon: '🥊', tier: 'basic', description: '基础暴击装备', stats: ['暴击率 +10%'], color: '#fbbf24' },
  { id: 'spatula', name: '金铲铲', icon: '🍳', tier: 'basic', description: '神秘的铲子', stats: ['特殊效果'], color: '#facc15' },
];

export const COMBINED_ITEMS: EquipmentItem[] = [
  { id: 'bf_sword', name: '暴风大剑', icon: '🗡️', tier: 'combined', description: '由双长剑合成', stats: ['攻击力 +25'], color: '#ef4444' },
  { id: 'chain_vest', name: '荆棘背心', icon: '🦔', tier: 'combined', description: '由双锁子甲合成', stats: ['护甲 +50', '反弹伤害'], color: '#14b8a6' },
  { id: 'dragons_claw', name: '巨龙之爪', icon: '🐉', tier: 'combined', description: '由双斗篷合成', stats: ['魔抗 +50', '魔法减伤'], color: '#8b5cf6' },
  { id: 'warmogs', name: '狂徒铠甲', icon: '❤️‍🔥', tier: 'combined', description: '由双腰带合成', stats: ['生命值 +500', '持续回血'], color: '#ea580c' },
  { id: 'seraphs', name: '炽天使之拥', icon: '👼', tier: 'combined', description: '由双泪滴合成', stats: ['法力值 +300', '施法回蓝'], color: '#3b82f6' },
  { id: 'rabadons', name: '灭世者之帽', icon: '🎩', tier: 'combined', description: '由双法杖合成', stats: ['法术强度 +50'], color: '#ec4899' },
  { id: 'guinsoo', name: '鬼索的狂暴之刃', icon: '⚡', tier: 'combined', description: '由双弓合成', stats: ['攻速 +35%', '叠攻速'], color: '#10b981' },
  { id: 'ie', name: '无尽之刃', icon: '💎', tier: 'combined', description: '由双拳套合成', stats: ['暴击率 +25%', '暴击伤害 +50%'], color: '#eab308' },
  { id: 'deathblade', name: '死亡之刃', icon: '☠️', tier: 'combined', description: '长剑+大棒', stats: ['攻击力 +30', '击杀叠加'], color: '#dc2626' },
  { id: 'titan', name: '泰坦的坚决', icon: '🏛️', tier: 'combined', description: '锁子甲+反曲弓', stats: ['护甲 +25', '攻速 +10%', '叠加双抗'], color: '#0d9488' },
  { id: 'ionic', name: '离子火花', icon: '⚡', tier: 'combined', description: '斗篷+反曲弓', stats: ['魔抗 +25', '攻速 +10%'], color: '#7c3aed' },
  { id: 'sunfire', name: '日炎斗篷', icon: '☀️', tier: 'combined', description: '锁子甲+腰带', stats: ['护甲 +30', '生命值 +250', '灼烧'], color: '#f59e0b' },
  { id: 'morello', name: '莫雷洛秘典', icon: '📕', tier: 'combined', description: '大棒+腰带', stats: ['法术强度 +25', '生命值 +250', '重伤'], color: '#be185d' },
  { id: 'shojin', name: '朔极之矛', icon: '🔱', tier: 'combined', description: '泪滴+大剑', stats: ['攻击力 +15', '法力值 +150', '攻击回蓝'], color: '#2563eb' },
  { id: 'ludens', name: '卢登的回声', icon: '🔊', tier: 'combined', description: '泪滴+大棒', stats: ['法术强度 +25', '法力值 +150', '溅射伤害'], color: '#7c3aed' },
  { id: 'statikk', name: '斯塔缇克电刃', icon: '⚡', tier: 'combined', description: '泪滴+反曲弓', stats: ['攻速 +15%', '法力值 +150', '连锁闪电'], color: '#0ea5e9' },
  { id: 'hand', name: '正义之手', icon: '✋', tier: 'combined', description: '泪滴+拳套', stats: ['法力值 +100', '暴击率 +10%'], color: '#6366f1' },
  { id: 'hurricane', name: '卢安娜的飓风', icon: '🌪️', tier: 'combined', description: '反曲弓+斗篷', stats: ['攻速 +20%', '魔抗 +20'], color: '#059669' },
  { id: 'rapid', name: '疾射火炮', icon: '🔫', tier: 'combined', description: '反曲弓+拳套', stats: ['攻速 +20%', '暴击率 +10%'], color: '#d97706' },
  { id: 'bramble', name: '荆棘之甲', icon: '🦔', tier: 'combined', description: '锁子甲+拳套', stats: ['护甲 +30', '暴击减伤'], color: '#0f766e' },
];

export const ADVANCED_ITEMS: EquipmentItem[] = [
  { id: 'divine', name: '神圣之剑', icon: '✨', tier: 'advanced', description: '暴风大剑+无尽之刃', stats: ['攻击力 +50', '暴击率 +30%', '神圣伤害'], color: '#fbbf24' },
  { id: 'eternal', name: '永恒铠甲', icon: '🛡️‍🔥', tier: 'advanced', description: '荆棘背心+狂徒铠甲', stats: ['护甲 +60', '生命值 +800', '不朽'], color: '#14b8a6' },
  { id: 'arcane', name: '奥术之心', icon: '🔮', tier: 'advanced', description: '灭世者之帽+炽天使之拥', stats: ['法术强度 +80', '法力值 +500', '奥术爆发'], color: '#a855f7' },
  { id: 'phantom', name: '幻影之舞', icon: '👻', tier: 'advanced', description: '鬼索+疾射火炮', stats: ['攻速 +60%', '暴击率 +15%', '幻影步'], color: '#10b981' },
  { id: 'apocalypse', name: '末日之刃', icon: '💀', tier: 'advanced', description: '死亡之刃+暴风大剑', stats: ['攻击力 +65', '末日打击'], color: '#991b1b' },
  { id: 'guardian', name: '守护天使', icon: '👼‍🔥', tier: 'advanced', description: '荆棘背心+暴风大剑', stats: ['攻击力 +20', '护甲 +40', '复活'], color: '#f97316' },
];

export const ALL_ITEMS: EquipmentItem[] = [...BASIC_ITEMS, ...COMBINED_ITEMS, ...ADVANCED_ITEMS];

export const SYNTHESIS_RECIPES: SynthesisRecipe[] = [
  { result: 'bf_sword', ingredients: ['sword', 'sword'] },
  { result: 'chain_vest', ingredients: ['vest', 'vest'] },
  { result: 'dragons_claw', ingredients: ['cloak', 'cloak'] },
  { result: 'warmogs', ingredients: ['belt', 'belt'] },
  { result: 'seraphs', ingredients: ['tear', 'tear'] },
  { result: 'rabadons', ingredients: ['rod', 'rod'] },
  { result: 'guinsoo', ingredients: ['bow', 'bow'] },
  { result: 'ie', ingredients: ['glove', 'glove'] },
  { result: 'deathblade', ingredients: ['sword', 'rod'] },
  { result: 'titan', ingredients: ['vest', 'bow'] },
  { result: 'ionic', ingredients: ['cloak', 'bow'] },
  { result: 'sunfire', ingredients: ['vest', 'belt'] },
  { result: 'morello', ingredients: ['rod', 'belt'] },
  { result: 'shojin', ingredients: ['tear', 'sword'] },
  { result: 'ludens', ingredients: ['tear', 'rod'] },
  { result: 'statikk', ingredients: ['tear', 'bow'] },
  { result: 'hand', ingredients: ['tear', 'glove'] },
  { result: 'hurricane', ingredients: ['bow', 'cloak'] },
  { result: 'rapid', ingredients: ['bow', 'glove'] },
  { result: 'bramble', ingredients: ['vest', 'glove'] },
  { result: 'divine', ingredients: ['bf_sword', 'ie'] },
  { result: 'eternal', ingredients: ['chain_vest', 'warmogs'] },
  { result: 'arcane', ingredients: ['rabadons', 'seraphs'] },
  { result: 'phantom', ingredients: ['guinsoo', 'rapid'] },
  { result: 'apocalypse', ingredients: ['deathblade', 'bf_sword'] },
  { result: 'guardian', ingredients: ['chain_vest', 'bf_sword'] },
];

export function getItemById(id: string): EquipmentItem | undefined {
  return ALL_ITEMS.find(item => item.id === id);
}

export function findRecipeByIngredients(item1: string, item2: string): SynthesisRecipe | undefined {
  return SYNTHESIS_RECIPES.find(
    recipe =>
      (recipe.ingredients[0] === item1 && recipe.ingredients[1] === item2) ||
      (recipe.ingredients[0] === item2 && recipe.ingredients[1] === item1)
  );
}

export function findRecipesForResult(itemId: string): SynthesisRecipe[] {
  return SYNTHESIS_RECIPES.filter(recipe => recipe.result === itemId);
}

export function findRecipesContainingIngredient(itemId: string): SynthesisRecipe[] {
  return SYNTHESIS_RECIPES.filter(
    recipe => recipe.ingredients[0] === itemId || recipe.ingredients[1] === itemId
  );
}

export function buildSynthesisTree(itemId: string): SynthesisTreeNode {
  const item = getItemById(itemId);
  if (!item) {
    return { id: itemId, name: '未知', icon: '❓', tier: 'basic', color: '#666' };
  }

  const node: SynthesisTreeNode = {
    id: item.id,
    name: item.name,
    icon: item.icon,
    tier: item.tier,
    color: item.color,
  };

  if (item.tier !== 'basic') {
    const recipe = SYNTHESIS_RECIPES.find(r => r.result === itemId);
    if (recipe) {
      node.children = [
        buildSynthesisTree(recipe.ingredients[0]),
        buildSynthesisTree(recipe.ingredients[1]),
      ];
    }
  }

  return node;
}
