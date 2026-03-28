import { describe, expect, it, vi } from "vitest";
import { calcDDay } from "@/utils";

describe("calcDDay", () => {
  it("날짜가 null일 때", ()=> {
    vi.setSystemTime(new Date("2026-03-29"));
    const result = calcDDay(null);
    expect(result).toBe("");
  });

  it("날짜가 D-Day일 때", ()=> {
    vi.setSystemTime(new Date("2026-03-29"));
    const result = calcDDay("2026-03-29");
    expect(result).toBe("D-Day");
  });

  it("날짜가 D-N일 때", ()=> {
    vi.setSystemTime(new Date("2026-03-29"));
    const result = calcDDay("2026-04-10 ~ 2026-04-15");
    expect(result).toBe("D-12");
  });

  it("날짜가 D+N일 때", ()=> {
    vi.setSystemTime(new Date("2026-03-29"));
    const result = calcDDay("2026-03-20 ~ 2026-03-25");
    expect(result).toBe("D+9");
  });
});