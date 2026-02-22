import { CalendarDateCell, CalendarItem, EventBarSegment } from "@/types/calendar";

export function buildCalendarCells(year: number, month: number): CalendarDateCell[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();
  const today = new Date();

  const cells: CalendarDateCell[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevLastDate - i;
    const y = month === 0 ? year - 1 : year;
    const m = month === 0 ? 11 : month - 1;
    cells.push({ year: y, month: m, date: d, isCurrentMonth: false, isToday: false });
  }

  for (let d = 1; d <= lastDate; d++) {
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === d;
    cells.push({ year, month, date: d, isCurrentMonth: true, isToday });
  }

  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    const y = month === 11 ? year + 1 : year;
    const m = month === 11 ? 0 : month + 1;
    for (let d = 1; d <= remaining; d++) {
      cells.push({ year: y, month: m, date: d, isCurrentMonth: false, isToday: false });
    }
  }

  const weeks: CalendarDateCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

/** ISO 8601("2026-02-12T00:00:00.000Z")과 "YYYY-MM-DD" 둘 다 처리 */
function parseDateStr(str: string): Date {
  const d = new Date(str);
  // UTC 기준으로 파싱된 날짜를 로컬 날짜로 변환
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function toDateOnly(cell: CalendarDateCell): Date {
  return new Date(cell.year, cell.month, cell.date);
}

export function buildEventSegmentsForWeek(
  week: CalendarDateCell[],
  items: CalendarItem[]
): EventBarSegment[] {
  const segments: EventBarSegment[] = [];
  const occupied: number[][] = Array.from({ length: 7 }, () => []);

  for (const item of items) {
    const itemStart = parseDateStr(item.startDate);
    const itemEnd = parseDateStr(item.endDate);

    const weekStart = toDateOnly(week[0]);
    const weekEnd = toDateOnly(week[6]);

    if (itemEnd < weekStart || itemStart > weekEnd) continue;

    let startCol = 0;
    let endCol = 6;

    for (let i = 0; i < 7; i++) {
      const cellDate = toDateOnly(week[i]);
      if (cellDate >= itemStart) {
        startCol = i;
        break;
      }
    }

    for (let i = 6; i >= 0; i--) {
      const cellDate = toDateOnly(week[i]);
      if (cellDate <= itemEnd) {
        endCol = i;
        break;
      }
    }

    let rowIndex = 0;
    while (true) {
      const conflict = Array.from(
        { length: endCol - startCol + 1 },
        (_, k) => occupied[startCol + k].includes(rowIndex)
      ).some(Boolean);
      if (!conflict) break;
      rowIndex++;
    }

    for (let col = startCol; col <= endCol; col++) {
      occupied[col].push(rowIndex);
    }

    segments.push({
      itemId: item.id,
      title: item.title,
      color: item.color,
      startCol,
      endCol,
      rowIndex,
    });
  }

  segments.sort((a, b) => a.rowIndex - b.rowIndex);
  return segments;
}