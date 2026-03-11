import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Search } from "@/types/search";

type SearchState = {
  keyword: string;
  results: Search[];
  recentKeywords: string[];
  setKeyword: (keyword: string) => void;
  setResults: (results: Search[]) => void;
  addRecentKeyword: (keyword: string) => void;
  removeRecentKeyword: (keyword: string) => void;
  clearRecentKeywords: () => void;
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      keyword: "",
      results: [],
      recentKeywords: [],
      setKeyword: (keyword) => set({ keyword }),
      setResults: (results) => set({ results }),
      addRecentKeyword: (keyword) => {
        const trimmed = keyword.trim();
        if (!trimmed) return;
        const prev = get().recentKeywords.filter((k) => k !== trimmed);
        set({ recentKeywords: [trimmed, ...prev].slice(0, 10) });
      },
      removeRecentKeyword: (keyword) =>
        set({ recentKeywords: get().recentKeywords.filter((k) => k !== keyword) }),
      clearRecentKeywords: () => set({ recentKeywords: [] }),
    }),
    {
      name: "search-storage",
      partialize: (state) => ({ recentKeywords: state.recentKeywords }),
    }
  )
);
