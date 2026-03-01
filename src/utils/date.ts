export function formatKoreanDate(date: string) {
  const isYmd = /^\d{4}-\d{2}-\d{2}$/.test(date);
  const d = isYmd
    ? new Date(
        Number(date.slice(0, 4)),
        Number(date.slice(5, 7)) - 1,
        Number(date.slice(8, 10))
      )
    : new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).split("T")[0].padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
}

export const getStatusText = (startDateStr: string, endDateStr: string) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (today < start) {
    const diffTime = start.getTime() - today.getTime();
    const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `D-${dDay}`;
  }

  if (today > end) {
    return "종료됨";
  }

  const diffTime = end.getTime() - today.getTime();
  const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");

  return `${remainingDays}일 남음`;
};
export function formatDateToYMD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDashedFormattedDate(date: string) {
    return date.split('T')[0]
}
