import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { advancedItems, findSynthesisResult } from '../data/items';

export interface CraftedItem {
  id: string;
  resultId: string;
  components: [string, string];
  timestamp: number;
}

export interface SavedCraftPlan {
  id: string;
  name: string;
  craftedItems: CraftedItem[];
  createdAt: number;
}

export interface SynthesisTreeNode {
  itemId: string;
  children?: [SynthesisTreeNode, SynthesisTreeNode];
  isBase: boolean;
}

interface ItemCraftState {
  slot1: string | null;
  slot2: string | null;
  craftedItems: CraftedItem[];
  savedPlans: SavedCraftPlan[];
  selectedAdvancedItemId: string | null;
  synthesisTree: SynthesisTreeNode | null;
}

const PLANS_STORAGE_KEY = 'totoro_craft_plans';

const loadSavedPlans = (): SavedCraftPlan[] => {
  try {
    const saved = localStorage.getItem(PLANS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: ItemCraftState = {
  slot1: null,
  slot2: null,
  craftedItems: [],
  savedPlans: loadSavedPlans(),
  selectedAdvancedItemId: null,
  synthesisTree: null,
};

const buildSynthesisTree = (itemId: string): SynthesisTreeNode => {
  const advancedItem = advancedItems.find(i => i.id === itemId);
  if (advancedItem) {
    return {
      itemId,
      isBase: false,
      children: [
        buildSynthesisTree(advancedItem.components[0]),
        buildSynthesisTree(advancedItem.components[1]),
      ],
    };
  }
  return {
    itemId,
    isBase: true,
  };
};

const persistPlans = (plans: SavedCraftPlan[]) => {
  localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
};

const itemCraftSlice = createSlice({
  name: 'itemCraft',
  initialState,
  reducers: {
    setSlot1: (state, action: PayloadAction<string | null>) => {
      state.slot1 = action.payload;
    },
    setSlot2: (state, action: PayloadAction<string | null>) => {
      state.slot2 = action.payload;
    },
    clearSlots: (state) => {
      state.slot1 = null;
      state.slot2 = null;
    },
    craftItem: (state) => {
      if (state.slot1 && state.slot2) {
        const result = findSynthesisResult(state.slot1, state.slot2);
        if (result) {
          state.craftedItems.push({
            id: `crafted_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            resultId: result.id,
            components: [state.slot1, state.slot2],
            timestamp: Date.now(),
          });
          state.slot1 = null;
          state.slot2 = null;
        }
      }
    },
    removeCraftedItem: (state, action: PayloadAction<string>) => {
      state.craftedItems = state.craftedItems.filter(item => item.id !== action.payload);
    },
    clearCraftedItems: (state) => {
      state.craftedItems = [];
    },
    saveCurrentPlan: (state, action: PayloadAction<string>) => {
      const newPlan: SavedCraftPlan = {
        id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: action.payload,
        craftedItems: [...state.craftedItems],
        createdAt: Date.now(),
      };
      state.savedPlans.unshift(newPlan);
      persistPlans(state.savedPlans);
    },
    loadPlan: (state, action: PayloadAction<string>) => {
      const plan = state.savedPlans.find(p => p.id === action.payload);
      if (plan) {
        state.craftedItems = [...plan.craftedItems];
        state.slot1 = null;
        state.slot2 = null;
      }
    },
    deletePlan: (state, action: PayloadAction<string>) => {
      state.savedPlans = state.savedPlans.filter(p => p.id !== action.payload);
      persistPlans(state.savedPlans);
    },
    selectAdvancedItem: (state, action: PayloadAction<string | null>) => {
      state.selectedAdvancedItemId = action.payload;
      if (action.payload) {
        state.synthesisTree = buildSynthesisTree(action.payload);
      } else {
        state.synthesisTree = null;
      }
    },
  },
});

export const {
  setSlot1,
  setSlot2,
  clearSlots,
  craftItem,
  removeCraftedItem,
  clearCraftedItems,
  saveCurrentPlan,
  loadPlan,
  deletePlan,
  selectAdvancedItem,
} = itemCraftSlice.actions;

export default itemCraftSlice.reducer;
