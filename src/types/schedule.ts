export interface Schedule {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  color: string;
  description?: string;
  location?: string;
  isHighlighted?: boolean;
}

export interface CalendarDate {
  year: number;
  month: number;
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  schedules: Schedule[];
}
