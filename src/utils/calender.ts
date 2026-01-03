import { CalendarDate, Schedule } from "@/types/schedule";

export const getCalendarDates = (
  year: number,
  month: number,
  schedules: Schedule[],
): CalendarDate[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const firstDayOfWeek = firstDay.getDay();
  const lastDate = lastDay.getDate();
  const prevLastDate = prevLastDay.getDate();

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();

  const dates: CalendarDate[] = [];

  // 이전 달 날짜들
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevLastDate - i;
    dates.push({
      year: month === 0 ? year - 1 : year,
      month: month === 0 ? 11 : month - 1,
      date,
      isCurrentMonth: false,
      isToday: false,
      schedules: [],
    });
  }

  // 현재 달 날짜들
  for (let date = 1; date <= lastDate; date++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    const dateSchedules = schedules.filter((schedule) => {
      const start = new Date(schedule.startDate);
      const end = new Date(schedule.endDate);
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });

    dates.push({
      year,
      month,
      date,
      isCurrentMonth: true,
      isToday: isCurrentMonth && date === todayDate,
      schedules: dateSchedules,
    });
  }

  // 다음 달 날짜들
  const remainingDays = 7 - (dates.length % 7);
  if (remainingDays < 7) {
    for (let date = 1; date <= remainingDays; date++) {
      dates.push({
        year: month === 11 ? year + 1 : year,
        month: month === 11 ? 0 : month + 1,
        date,
        isCurrentMonth: false,
        isToday: false,
        schedules: [],
      });
    }
  }

  return dates;
};

export const formatDate = (
  year: number,
  month: number,
  date: number,
): string => {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
};

export const getWeekNumber = (dates: CalendarDate[], index: number): number => {
  return Math.floor(index / 7);
};
