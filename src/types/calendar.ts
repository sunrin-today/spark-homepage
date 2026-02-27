export interface CalendarItem {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  color: string;
}

export interface CalendarProps {
  year: number;
  month: number; // 0-indexed
  items: CalendarItem[];
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onClickDate?: (date: string) => void;
}

export interface CalendarDateCell {
  year: number;
  month: number; // 0-indexed
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

/** 한 주(row) 안에서 렌더링할 이벤트 바 세그먼트 */
export interface EventBarSegment {
  itemId: string;
  title: string;
  color: string;
  /** 0~6 */
  startCol: number;
  /** 0~6 */
  endCol: number;
  /** stacking 순서 (0-indexed) */
  rowIndex: number;
}