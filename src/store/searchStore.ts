import { create } from "zustand";
import { Search } from "@/types/search";

type SearchState = {
  keyword: string;
  results: Search[];
  setKeyword: (keyword: string) => void;
  setResults: (results: Search[]) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  keyword: "",
  results: [],
  setKeyword: (keyword) => set({ keyword }),
  setResults: (results) => set({ results }),
}));
