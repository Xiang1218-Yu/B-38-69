export interface Equipment {
  id: string;
  name: string;
  tier: 'basic' | 'advanced' | 'legendary';
  icon: string;
  description: string;
  stats: {
    [key: string]: number;
  };
}

export interface Recipe {
  id: string;
  resultId: string;
  ingredients: string[];
}

export const basicEquipments: Equipment[] = [
  {
    id: 'sword_blade',
    name: '剑刃',
    tier: 'basic',
    icon: '⚔️',
    description: '锋利的剑刃，是合成武器的基础材料',
    stats: { attack: 10 },
  },
  {
    id: 'hilt',
    name: '剑柄',
    tier: 'basic',
    icon: '🖐️',
    description: '坚固的剑柄，提供良好的握持感',
    stats: { durability: 5 },
  },
  {
    id: 'leather',
    name: '皮革',
    tier: 'basic',
    icon: '🧶',
    description: '柔软的皮革，用于制作防具',
    stats: { defense: 5 },
  },
  {
    id: 'iron_ingot',
    name: '铁锭',
    tier: 'basic',
    icon: '🔩',
    description: '精炼的铁锭，锻造的基础材料',
    stats: { defense: 8 },
  },
  {
    id: 'magic_crystal',
    name: '魔法水晶',
    tier: 'basic',
    icon: '💎',
    description: '蕴含魔力的水晶，增加法术强度',
    stats: { magicPower: 15 },
  },
  {
    id: 'wooden_staff',
    name: '木杖',
    tier: 'basic',
    icon: '🪄',
    description: '普通的木杖，是法杖的基础',
    stats: { magicPower: 5 },
  },
  {
    id: 'bow_limb',
    name: '弓臂',
    tier: 'basic',
    icon: '🏹',
    description: '弹性良好的弓臂',
    stats: { attack: 8 },
  },
  {
    id: 'bow_string',
    name: '弓弦',
    tier: 'basic',
    icon: '🧵',
    description: '坚韧的弓弦',
    stats: { attackSpeed: 10 },
  },
  {
    id: 'helmet_mold',
    name: '头盔模具',
    tier: 'basic',
    icon: '⛑️',
    description: '头盔的基础模具',
    stats: { defense: 6 },
  },
  {
    id: 'boot_sole',
    name: '鞋底',
    tier: 'basic',
    icon: '👟',
    description: '耐磨的鞋底',
    stats: { speed: 5 },
  },
];

export const advancedEquipments: Equipment[] = [
  {
    id: 'iron_sword',
    name: '铁剑',
    tier: 'advanced',
    icon: '🗡️',
    description: '基础的铁制长剑',
    stats: { attack: 25, durability: 10 },
  },
  {
    id: 'leather_armor',
    name: '皮甲',
    tier: 'advanced',
    icon: '🥋',
    description: '轻便的皮革护甲',
    stats: { defense: 15, speed: 3 },
  },
  {
    id: 'magic_staff',
    name: '魔法杖',
    tier: 'advanced',
    icon: '🪄',
    description: '蕴含魔力的法杖',
    stats: { magicPower: 30, manaRegen: 5 },
  },
  {
    id: 'bow',
    name: '长弓',
    tier: 'advanced',
    icon: '🏹',
    description: '射程较远的长弓',
    stats: { attack: 20, attackSpeed: 15 },
  },
  {
    id: 'iron_helmet',
    name: '铁头盔',
    tier: 'advanced',
    icon: '🪖',
    description: '坚固的铁制头盔',
    stats: { defense: 20 },
  },
  {
    id: 'leather_boots',
    name: '皮靴',
    tier: 'advanced',
    icon: '👢',
    description: '轻便的皮靴，增加移动速度',
    stats: { speed: 12, defense: 5 },
  },
  {
    id: 'iron_chestplate',
    name: '铁甲胸甲',
    tier: 'advanced',
    icon: '🛡️',
    description: '坚固的铁制胸甲',
    stats: { defense: 30 },
  },
  {
    id: 'magic_ring',
    name: '魔法戒指',
    tier: 'advanced',
    icon: '💍',
    description: '增强魔力的戒指',
    stats: { magicPower: 20, manaRegen: 3 },
  },
];

export const legendaryEquipments: Equipment[] = [
  {
    id: 'flame_sword',
    name: '烈焰之剑',
    tier: 'legendary',
    icon: '🔥',
    description: '蕴含火焰力量的传奇武器',
    stats: { attack: 60, fireDamage: 30, durability: 20 },
  },
  {
    id: 'dragon_armor',
    name: '龙鳞战甲',
    tier: 'legendary',
    icon: '🐉',
    description: '用龙鳞打造的传奇护甲',
    stats: { defense: 80, fireResist: 50, health: 100 },
  },
  {
    id: 'archmage_staff',
    name: '大法师之杖',
    tier: 'legendary',
    icon: '✨',
    description: '传说中大法师使用的法杖',
    stats: { magicPower: 80, manaRegen: 20, cooldownReduction: 15 },
  },
  {
    id: 'wind_hunter_bow',
    name: '风猎之弓',
    tier: 'legendary',
    icon: '💨',
    description: '如风般迅捷的传奇长弓',
    stats: { attack: 50, attackSpeed: 40, criticalChance: 20 },
  },
  {
    id: 'guardian_helmet',
    name: '守护者头盔',
    tier: 'legendary',
    icon: '👑',
    description: '守护之力的象征',
    stats: { defense: 50, health: 80, mana: 50 },
  },
];

export const allEquipments: Equipment[] = [
  ...basicEquipments,
  ...advancedEquipments,
  ...legendaryEquipments,
];

export const recipes: Recipe[] = [
  {
    id: 'recipe_iron_sword',
    resultId: 'iron_sword',
    ingredients: ['sword_blade', 'hilt', 'iron_ingot'],
  },
  {
    id: 'recipe_leather_armor',
    resultId: 'leather_armor',
    ingredients: ['leather', 'leather', 'iron_ingot'],
  },
  {
    id: 'recipe_magic_staff',
    resultId: 'magic_staff',
    ingredients: ['wooden_staff', 'magic_crystal', 'magic_crystal'],
  },
  {
    id: 'recipe_bow',
    resultId: 'bow',
    ingredients: ['bow_limb', 'bow_limb', 'bow_string'],
  },
  {
    id: 'recipe_iron_helmet',
    resultId: 'iron_helmet',
    ingredients: ['helmet_mold', 'iron_ingot', 'iron_ingot'],
  },
  {
    id: 'recipe_leather_boots',
    resultId: 'leather_boots',
    ingredients: ['boot_sole', 'leather', 'leather'],
  },
  {
    id: 'recipe_iron_chestplate',
    resultId: 'iron_chestplate',
    ingredients: ['iron_ingot', 'iron_ingot', 'iron_ingot', 'leather'],
  },
  {
    id: 'recipe_magic_ring',
    resultId: 'magic_ring',
    ingredients: ['magic_crystal', 'iron_ingot'],
  },
  {
    id: 'recipe_flame_sword',
    resultId: 'flame_sword',
    ingredients: ['iron_sword', 'magic_crystal', 'magic_crystal'],
  },
  {
    id: 'recipe_dragon_armor',
    resultId: 'dragon_armor',
    ingredients: ['iron_chestplate', 'leather_armor', 'magic_crystal'],
  },
  {
    id: 'recipe_archmage_staff',
    resultId: 'archmage_staff',
    ingredients: ['magic_staff', 'magic_ring', 'magic_crystal'],
  },
  {
    id: 'recipe_wind_hunter_bow',
    resultId: 'wind_hunter_bow',
    ingredients: ['bow', 'leather_boots', 'magic_crystal'],
  },
  {
    id: 'recipe_guardian_helmet',
    resultId: 'guardian_helmet',
    ingredients: ['iron_helmet', 'magic_ring', 'iron_ingot'],
  },
];

export const getEquipmentById = (id: string): Equipment | undefined => {
  return allEquipments.find((eq) => eq.id === id);
};

export const findRecipeForResult = (resultId: string): Recipe | undefined => {
  return recipes.find((r) => r.resultId === resultId);
};

export const canCraft = (ingredients: string[]): Recipe | null => {
  const sortedIngredients = [...ingredients].sort();
  
  for (const recipe of recipes) {
    const sortedRecipeIngredients = [...recipe.ingredients].sort();
    if (
      sortedIngredients.length === sortedRecipeIngredients.length &&
      sortedIngredients.every((ing, idx) => ing === sortedRecipeIngredients[idx])
    ) {
      return recipe;
    }
  }
  return null;
};
