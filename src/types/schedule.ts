export type ScheduleType = "ACADEMIC";

export interface Schedule {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  color: string;
  type: ScheduleType;
  eventId: string | null;
}

export interface CalendarDate {
  year: number;
  month: number;
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  schedules: Schedule[];
}