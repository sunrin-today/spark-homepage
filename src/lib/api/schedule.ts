import api from './api';
import { Schedule } from '@/types/schedule';

const scheduleApi = {
  getAllSchedules: async () => {
    const response = await api.get<Schedule[]>('/api/schedule');
    return response.data;
  },

  getSchedulesByMonth: async (year: string, month: string) => {
    const response = await api.get<Schedule[]>('/api/schedule/month', {
      params: { year, month },
    });
    return response.data;
  },

  getSchedulesByDate: async (date: string) => {
    const response = await api.get<Schedule[]>('/api/schedule/date', {
      params: { date },
    });
    return response.data;
  },

  getOngoingSchedules: async () => {
    const response = await api.get<Schedule[]>('/api/schedule/status/ongoing');
    return response.data;
  },

  getUpcomingSchedules: async () => {
    const response = await api.get<Schedule[]>('/api/schedule/status/upcoming');
    return response.data;
  },

  getEndedSchedules: async () => {
    const response = await api.get<Schedule[]>('/api/schedule/status/ended');
    return response.data;
  },

  getCalendarSchedules: async (year: string, month: string) => {
    const response = await api.get<Schedule[]>('/api/schedule/calendar', {
      params: { year, month },
    });
    return response.data;
  },

  getScheduleById: async (id: string) => {
    const response = await api.get<Schedule>(`/api/schedule/${id}`);
    return response.data;
  },
};

export default scheduleApi;