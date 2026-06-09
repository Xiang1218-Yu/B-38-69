import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SynthesisTreeNode } from '../data/equipmentData';

export interface SynthesisSlot {
  itemId: string | null;
}

export interface SynthesisResult {
  itemId: string;
  tree: SynthesisTreeNode;
  timestamp: number;
}

export interface SavedScheme {
  id: string;
  name: string;
  results: SynthesisResult[];
  createdAt: number;
}

interface EquipmentState {
  slots: [SynthesisSlot, SynthesisSlot];
  results: SynthesisResult[];
  selectedAdvancedItem: string | null;
  savedSchemes: SavedScheme[];
}

const SCHEMES_STORAGE_KEY = 'totoro_synthesis_schemes';

const getStoredSchemes = (): SavedScheme[] => {
  try {
    const saved = localStorage.getItem(SCHEMES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: EquipmentState = {
  slots: [{ itemId: null }, { itemId: null }],
  results: [],
  selectedAdvancedItem: null,
  savedSchemes: getStoredSchemes(),
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    placeItem(state, action: PayloadAction<{ slotIndex: number; itemId: string }>) {
      const { slotIndex, itemId } = action.payload;
      state.slots[slotIndex].itemId = itemId;
    },
    removeItem(state, action: PayloadAction<number>) {
      state.slots[action.payload].itemId = null;
    },
    clearSlots(state) {
      state.slots = [{ itemId: null }, { itemId: null }];
    },
    addResult(state, action: PayloadAction<SynthesisResult>) {
      state.results.unshift(action.payload);
    },
    clearResults(state) {
      state.results = [];
    },
    selectAdvancedItem(state, action: PayloadAction<string | null>) {
      state.selectedAdvancedItem = action.payload;
    },
    saveScheme(state, action: PayloadAction<{ name: string }>) {
      const scheme: SavedScheme = {
        id: `scheme_${Date.now()}`,
        name: action.payload.name,
        results: [...state.results],
        createdAt: Date.now(),
      };
      state.savedSchemes.unshift(scheme);
      localStorage.setItem(SCHEMES_STORAGE_KEY, JSON.stringify(state.savedSchemes));
    },
    deleteScheme(state, action: PayloadAction<string>) {
      state.savedSchemes = state.savedSchemes.filter(s => s.id !== action.payload);
      localStorage.setItem(SCHEMES_STORAGE_KEY, JSON.stringify(state.savedSchemes));
    },
    loadScheme(state, action: PayloadAction<string>) {
      const scheme = state.savedSchemes.find(s => s.id === action.payload);
      if (scheme) {
        state.results = [...scheme.results];
      }
    },
  },
});

export const {
  placeItem,
  removeItem,
  clearSlots,
  addResult,
  clearResults,
  selectAdvancedItem,
  saveScheme,
  deleteScheme,
  loadScheme,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
