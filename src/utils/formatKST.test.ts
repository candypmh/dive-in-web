import { describe, expect, it } from "vitest";
import { formatKST } from "@/utils"

describe("formatKST", () => {
  it("날짜가 YYYY-MM-DD로 표기", () => {
    const result = formatKST("2026-03-29T11:00:00.000Z");
    expect(result).toBe("2026-03-29");
  });

  it("MM나 DD이 한자리수면 0 붙여서 표기", () => {
    const result = formatKST("2026-03-07T11:00:00.000Z");
    expect(result).toBe("2026-03-07");
  });

  it("날짜가 UTC 기준과 달라질 경우", () => {
    const result = formatKST("2026-03-17T15:00:00.000Z");
    expect(result).toBe("2026-03-18");
  });

});