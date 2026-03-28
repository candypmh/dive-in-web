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

// 대회 기간 문자열 → D-Day 계산
// 예: "2026.05.01 ~ 2026.05.10" → "D-34"
export function calcDDay(period: string | null): string {
  if (!period) return "";
  const startStr = period.split("~")[0].trim().replace(/\./g, "-");
  const [y, m, d] = startStr.split("-").map(Number);
  const start = new Date(y, m - 1, d); //KST new Date(y, m-1, d) 처럼 시간을 안 넣으면 자동으로 로컬(KST) 자정 00:00:00으로 생성
  const today = new Date(); //UTC  2026-03-29 14:37:22 KST
  today.setHours(0, 0, 0, 0); //KST 2026-03-29 00:00:00 KST  ← 날짜만 남김
  const diff = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return "D-Day";
  return `D+${Math.abs(diff)}`;
}