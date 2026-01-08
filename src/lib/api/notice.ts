import { Notice } from '@/types/notice';
// import apiClient from './api';
import { noticeDummyData, getNoticeById } from '@/lib/noticeDummy';

export const noticesApi = {
  getNotices: async (): Promise<Notice[]> => {
    // const response = await apiClient.get('/api/notice');
    // const data = response.data;
    // return Array.isArray(data) ? data : (data.notices || []);
    
    // 더미 데이터
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(noticeDummyData);
      }, 500);
    });
  },

  getNoticeById: async (id: string): Promise<Notice> => {
    // const response = await apiClient.get(`/api/notice/${id}`);
    // return response.data;
    
    // 더미 데이터
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const notice = getNoticeById(id);
        if (notice) {
          resolve(notice);
        } else {
          reject(new Error('Notice not found'));
        }
      }, 500);
    });
  },
};