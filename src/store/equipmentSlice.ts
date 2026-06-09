import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Equipment } from "../data/equipment";

export interface CraftScheme {
  id: string;
  name: string;
  resultEquipment: Equipment;
  ingredients: Equipment[];
  createdAt: number;
}

interface EquipmentState {
  craftSchemes: CraftScheme[];
  selectedSchemeId: string | null;
}

const STORAGE_KEY = "equipment_craft_schemes";

const getStoredSchemes = (): CraftScheme[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveSchemes = (schemes: CraftScheme[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schemes));
  } catch {
    console.error("Failed to save craft schemes");
  }
};

const initialState: EquipmentState = {
  craftSchemes: getStoredSchemes(),
  selectedSchemeId: null,
};

const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    addCraftScheme: (state, action: PayloadAction<Omit<CraftScheme, "id" | "createdAt">>) => {
      const newScheme: CraftScheme = {
        ...action.payload,
        id: `scheme_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
      };
      state.craftSchemes.unshift(newScheme);
      saveSchemes(state.craftSchemes);
    },
    removeCraftScheme: (state, action: PayloadAction<string>) => {
      state.craftSchemes = state.craftSchemes.filter((s) => s.id !== action.payload);
      if (state.selectedSchemeId === action.payload) {
        state.selectedSchemeId = null;
      }
      saveSchemes(state.craftSchemes);
    },
    selectScheme: (state, action: PayloadAction<string | null>) => {
      state.selectedSchemeId = action.payload;
    },
    renameScheme: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const scheme = state.craftSchemes.find((s) => s.id === action.payload.id);
      if (scheme) {
        scheme.name = action.payload.name;
        saveSchemes(state.craftSchemes);
      }
    },
    clearAllSchemes: (state) => {
      state.craftSchemes = [];
      state.selectedSchemeId = null;
      saveSchemes(state.craftSchemes);
    },
  },
});

export const {
  addCraftScheme,
  removeCraftScheme,
  selectScheme,
  renameScheme,
  clearAllSchemes,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
