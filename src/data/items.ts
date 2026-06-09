export interface BaseItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface AdvancedItem {
  id: string;
  name: string;
  icon: string;
  components: [string, string];
  description: string;
}

export const baseItems: BaseItem[] = [
  { id: 'bf_sword', name: '暴风大剑', icon: '⚔️', description: '+10攻击力' },
  { id: 'recurve_bow', name: '反曲之弓', icon: '🏹', description: '+10%攻速' },
  { id: 'needlessly_large_rod', name: '无用大棒', icon: '🪄', description: '+20法术强度' },
  { id: 'tear_of_the_goddess', name: '女神之泪', icon: '💧', description: '+15法力值' },
  { id: 'chain_vest', name: '锁子甲', icon: '🛡️', description: '+20护甲' },
  { id: 'negatron_cloak', name: '负极斗篷', icon: '🧣', description: '+25魔抗' },
  { id: 'giants_belt', name: '巨人腰带', icon: '🎗️', description: '+150生命值' },
  { id: 'spatula', name: '金铲铲', icon: '🥄', description: '特殊合成材料' },
];

export const advancedItems: AdvancedItem[] = [
  { id: 'deathblade', name: '死亡之刃', icon: '🗡️', components: ['bf_sword', 'bf_sword'], description: '+40攻击力，参与击杀后+9攻击力' },
  { id: 'giant_slayer', name: '巨杀', icon: '⚔️', components: ['bf_sword', 'recurve_bow'], description: '对生命值高于1600的敌人造成30%额外伤害' },
  { id: 'hextech_gunblade', name: '海克斯科技枪刃', icon: '🔫', components: ['bf_sword', 'needlessly_large_rod'], description: '25%全能吸血，魔法伤害也可治疗最低生命值友军' },
  { id: 'spear_of_shojin', name: '朔极之矛', icon: '🔱', components: ['bf_sword', 'tear_of_the_goddess'], description: '施放技能后获得8点额外法力值每次普攻' },
  { id: 'guardian_angel', name: '守护天使', icon: '👼', components: ['bf_sword', 'chain_vest'], description: '死亡后2秒复活回复400生命值' },
  { id: 'bloodthirster', name: '饮血剑', icon: '🩸', components: ['bf_sword', 'negatron_cloak'], description: '25%物理吸血，首次低于40%生命时获得护盾' },
  { id: 'zephyr', name: '凌风', icon: '🌪️', components: ['bf_sword', 'giants_belt'], description: '战斗开始时放逐对面镜像位置敌人5秒' },
  { id: 'infinity_edge', name: '无尽之刃', icon: '💎', components: ['bf_sword', 'spatula'], description: '提供75%暴击几率和10%暴击伤害' },
  
  { id: 'guinsoos_rageblade', name: '鬼索的狂暴之刃', icon: '🔪', components: ['recurve_bow', 'needlessly_large_rod'], description: '每次攻击获得+6%攻速（可无限叠加）' },
  { id: 'statikk_shiv', name: '斯塔缇克电刃', icon: '⚡', components: ['recurve_bow', 'tear_of_the_goddess'], description: '每3次普攻弹射3个敌人造成魔法伤害' },
  { id: 'titanic_hydra', name: '巨型九头蛇', icon: '🐍', components: ['recurve_bow', 'chain_vest'], description: '普攻造成锥形范围物理伤害' },
  { id: 'runaans_hurricane', name: '卢安娜的飓风', icon: '🌀', components: ['recurve_bow', 'negatron_cloak'], description: '普攻额外攻击2个目标造成50%伤害' },
  { id: 'zekes_herald', name: '基克的先驱', icon: '📯', components: ['recurve_bow', 'giants_belt'], description: '战斗开始时左右一格友军+30%攻速' },
  { id: 'blade_of_the_ruined_king', name: '破败王者之刃', icon: '👑', components: ['recurve_bow', 'spatula'], description: '携带者也是剑士' },
  
  { id: 'rabadons_deathcap', name: '灭世者的死亡之帽', icon: '🎩', components: ['needlessly_large_rod', 'needlessly_large_rod'], description: '+50法术强度，法术强度增加50%' },
  { id: 'archangels_staff', name: '大天使之杖', icon: '👼', components: ['needlessly_large_rod', 'tear_of_the_goddess'], description: '每次施放技能获得+30法术强度' },
  { id: 'locket_of_the_iron_solari', name: '钢铁烈阳之匣', icon: '🔰', components: ['needlessly_large_rod', 'chain_vest'], description: '战斗开始为相邻2格友军提供护盾' },
  { id: 'ionic_spark', name: '离子火花', icon: '💥', components: ['needlessly_large_rod', 'negatron_cloak'], description: '敌人施法时受到魔法伤害并减少50%魔抗' },
  { id: 'morellonomicon', name: '莫雷洛秘典', icon: '📕', components: ['needlessly_large_rod', 'giants_belt'], description: '技能造成25%灼烧和50%重伤效果' },
  { id: 'yuumi', name: '悠米', icon: '🐱', components: ['needlessly_large_rod', 'spatula'], description: '携带者也是法师' },
  
  { id: 'frozen_heart', name: '冰霜之心', icon: '❄️', components: ['tear_of_the_goddess', 'chain_vest'], description: '降低周围敌人50%攻击速度' },
  { id: 'hush', name: '沉默', icon: '🤫', components: ['tear_of_the_goddess', 'negatron_cloak'], description: '普攻有33%几率沉默敌人4秒' },
  { id: 'red_buff', name: '红buff', icon: '🔴', components: ['tear_of_the_goddess', 'giants_belt'], description: '普攻造成10%灼烧和50%重伤' },
  { id: 'darkin', name: '暗裔', icon: '🌑', components: ['tear_of_the_goddess', 'spatula'], description: '携带者也是恶魔' },
  
  { id: 'thornmail', name: '荆棘之甲', icon: '🌵', components: ['chain_vest', 'chain_vest'], description: '免疫暴击伤害，受到普攻时反弹伤害' },
  { id: 'sword_breaker', name: '破剑者', icon: '🚫', components: ['chain_vest', 'negatron_cloak'], description: '普攻有33%几率缴械敌人3秒' },
  { id: 'warmogs_armor', name: '狂徒铠甲', icon: '❤️', components: ['chain_vest', 'giants_belt'], description: '+1000生命值，每秒回复6%最大生命值' },
  { id: 'knights_vow', name: '骑士之誓', icon: '⚜️', components: ['chain_vest', 'spatula'], description: '携带者也是骑士' },
  
  { id: 'dragons_claw', name: '巨龙之爪', icon: '🐉', components: ['negatron_cloak', 'negatron_cloak'], description: '提供83%魔法抗性' },
  { id: 'zekes_herald_alt', name: '灵风', icon: '🍃', components: ['negatron_cloak', 'giants_belt'], description: '战斗开始时放逐对面敌人5秒' },
  { id: 'wardens_mail', name: '守护者铠甲', icon: '🛡️', components: ['negatron_cloak', 'spatula'], description: '携带者也是护卫' },
  
  { id: 'warmogs_alt', name: '狂徒圣盾', icon: '💗', components: ['giants_belt', 'giants_belt'], description: '增加生命值和回复' },
  { id: 'brawler_gloves', name: '格斗家手套', icon: '🥊', components: ['giants_belt', 'spatula'], description: '携带者也是格斗家' },
  
  { id: 'force_of_nature', name: '自然之力', icon: '🌿', components: ['spatula', 'spatula'], description: '人口上限+1' },
];

export const getItemById = (id: string): BaseItem | AdvancedItem | undefined => {
  return baseItems.find(i => i.id === id) || advancedItems.find(i => i.id === id);
};

export const findSynthesisResult = (item1: string, item2: string): AdvancedItem | undefined => {
  return advancedItems.find(
    (item) =>
      (item.components[0] === item1 && item.components[1] === item2) ||
      (item.components[0] === item2 && item.components[1] === item1)
  );
};
