export const CATEGORIES = [
  { name: "전체", key: "none" },
  { name: "인기글", key: "popular" },
  { name: "소통해요", key: "communication" },
  { name: "수영장", key: "pool" },
  { name: "수영물품", key: "goods" },
  { name: "수영대회", key: "competition" },
];

//Mock-url change
export const KEY_TO_CATEGORYNAME = {
  none: null,
  popular: null,
  communication: "COMMUNICATION",
  pool: "POOL",
  goods: "GOODS",
  competition: "COMPETITION",
} as const;

// export type CategoryName = "COMMUNICATION" | "POOL" | "GOODS" | "COMPETITION"; 
export const CATEGORY_NAMES = ["COMMUNICATION", "POOL", "GOODS", "COMPETITION"] as const;
export type CategoryName = (typeof CATEGORY_NAMES)[number];

export const CATEGORYNAME_TO_LABEL: Record<CategoryName, string> = {
  COMMUNICATION: "소통해요",
  POOL: "수영장",
  GOODS: "수영물품",
  COMPETITION: "수영대회",
};

export function toCategoryName(input: string): CategoryName {
  const upper = input.toUpperCase();
  if((CATEGORY_NAMES as readonly string[]).includes(upper)){
    return upper as CategoryName;
  }
  console.warn("Unknown category from server::", input);
  return "COMMUNICATION";
}