import { Notice, NoticeListResponse, NoticeDetailResponse } from '@/types/notice';
import api from './api';

const transformNoticeFromApi = (apiNotice: NoticeDetailResponse): Notice => {
  return {
    id: apiNotice.id,
    title: apiNotice.title,
    content: apiNotice.content,
    author: apiNotice.author,
    createdAt: apiNotice.createdAt,
    updatedAt: apiNotice.updatedAt,
    viewCount: apiNotice.viewCount,
    views: apiNotice.viewCount,
    images: apiNotice.images,
    imageUrls: apiNotice.images?.map(img => img.url) || [],
  };
};

export const noticesApi = {
  getNotices: async (page: number = 1, limit: number = 10, search?: string): Promise<NoticeListResponse> => {
    try {
      const response = await api.get<NoticeListResponse>('/api/notice', {
        params: { page, limit, ...(search ? { search } : {}) },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      throw error;
    }
  },

  getRecentNotices: async (page: number = 1, limit: number = 4): Promise<Notice[]> => {
    try {
      const response = await api.get<NoticeListResponse>('/api/notice', {
        params: { page, limit },
      });
      return response.data.items.map(transformNoticeFromApi);
    } catch (error) {
      console.error('Failed to fetch recent notices:', error);
      throw error;
    }
  },

  getNoticeById: async (id: string): Promise<Notice> => {
    try {
      const response = await api.get<NoticeDetailResponse>(`/api/notice/${id}`);
      return transformNoticeFromApi(response.data);
    } catch (error) {
      console.error('Failed to fetch notice:', error);
      throw error;
    }
  },
};