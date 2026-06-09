import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Author {
  name: string;
  avatar: string;
}

export interface Synergy {
  name: string;
  icon: string;
  count: number;
  level: "bronze" | "silver" | "gold" | "chromatic";
}

export interface Hero {
  name: string;
  icon: string;
  items?: string[];
}

export interface Lineup {
  id: string;
  title: string;
  author: Author;
  rating: string;
  difficulty: string;
  tags: string[];
  synergies: Synergy[];
  coreHeroes: Hero[];
  fullLineup: Hero[];
  heat: number;
  createdAt: number;
}

interface LineupState {
  lineups: Lineup[];
  filteredLineups: Lineup[];
  filter: {
    category: string;
    rating: string;
    search: string;
  };
  sortBy: "latest" | "hottest";
  favorites: string[];
  currentVersion: string;
}

// Persistence helper
const FAVORITES_STORAGE_KEY = "totoro_favorites";
const getStoredFavorites = (): string[] => {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: LineupState = {
  lineups: [],
  filteredLineups: [],
  filter: {
    category: "全部",
    rating: "全部",
    search: "",
  },
  sortBy: "latest",
  favorites: getStoredFavorites(),
  currentVersion: "14.2",
};

const applyFilters = (state: LineupState) => {
  const result = state.lineups.filter((lineup) => {
    const matchCategory =
      state.filter.category === "全部" ||
      lineup.tags.includes(state.filter.category);
    const matchRating =
      state.filter.rating === "全部" || lineup.rating === state.filter.rating;
    const matchSearch =
      lineup.title.toLowerCase().includes(state.filter.search.toLowerCase()) ||
      lineup.fullLineup.some((h) =>
        h.name.toLowerCase().includes(state.filter.search.toLowerCase()),
      );
    return matchCategory && matchRating && matchSearch;
  });

  // Apply sorting
  if (state.sortBy === "latest") {
    result.sort((a, b) => b.createdAt - a.createdAt);
  } else if (state.sortBy === "hottest") {
    result.sort((a, b) => b.heat - a.heat);
  }

  state.filteredLineups = result;
};

const lineupSlice = createSlice({
  name: "lineups",
  initialState,
  reducers: {
    setLineups: (state, action: PayloadAction<Lineup[]>) => {
      state.lineups = action.payload;
      applyFilters(state);
    },
    appendLineups: (state, action: PayloadAction<Lineup[]>) => {
      state.lineups = [...state.lineups, ...action.payload];
      applyFilters(state);
    },
    setFilter: (
      state,
      action: PayloadAction<Partial<LineupState["filter"]>>,
    ) => {
      state.filter = { ...state.filter, ...action.payload };
      applyFilters(state);
    },
    setSortBy: (state, action: PayloadAction<LineupState["sortBy"]>) => {
      state.sortBy = action.payload;
      applyFilters(state);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(id);
      }
      // Persist to localStorage
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(state.favorites),
      );
    },
    setCurrentVersion: (state, action: PayloadAction<string>) => {
      state.currentVersion = action.payload;
    },
  },
});

export const {
  setLineups,
  setFilter,
  appendLineups,
  setSortBy,
  toggleFavorite,
  setCurrentVersion,
} = lineupSlice.actions;
export default lineupSlice.reducer;
