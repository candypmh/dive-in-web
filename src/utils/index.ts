export const logger = {
  log: (...args: unknown[]) => console.log("[LOG]", ...args),
  error: (...args: unknown[]) => console.error("[ERROR]", ...args),
};


// ISO 8601 문자열 → KST 기준 "YYYY-MM-DD" 반환
// 예: "2026-01-01T00:00:00.000Z" → "2026-01-01"
export function formatKST(isoString: string): string {
  const kst = new Date(
    new Date(isoString).toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  const y = kst.getFullYear();
  const m = String(kst.getMonth() + 1).padStart(2, "0");
  const d = String(kst.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}