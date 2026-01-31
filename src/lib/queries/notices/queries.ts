import { useQuery } from '@tanstack/react-query';
import { noticesApi } from '@/lib/api/notice';
import { noticeKeys } from './keys';

export const useNotice = (id: string) => {
  return useQuery({
    queryKey: noticeKeys.detail(id),
    queryFn: () => noticesApi.getNoticeById(id),
    enabled: !!id,
  });
};

export const useNotices = () => {
  return useQuery({
    queryKey: noticeKeys.lists(),
    queryFn: () => noticesApi.getNotices(),
  });
};

export const useRecentNotices = (page: number = 1, limit: number = 4) => {
  return useQuery({
    queryKey: [...noticeKeys.lists(), 'recent', page, limit],
    queryFn: () => noticesApi.getRecentNotices(page, limit),
    staleTime: 5 * 60 * 1000, // 5분
  });
};