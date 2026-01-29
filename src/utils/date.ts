export function formatKoreanDate(date: string) {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).split("T")[0].padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
}

export function getDashedFormattedDate(date: string) {
    return date.split('T')[0]
}