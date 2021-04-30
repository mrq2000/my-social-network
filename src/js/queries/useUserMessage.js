import { useInfiniteQuery } from 'react-query';
import { api } from '../helpers/axios';

const useUserMessages = (userId, limit) => useInfiniteQuery(['messages', userId, limit], async ({ pageParam = null }) => {
  if (pageParam === false) return [];

  const res = await api.get(`/messages/friends/${userId}`, {
    params: {
      cursor: pageParam,
      limit,
    },
  });

  return res.data;
}, {
  getNextPageParam: (lastPage) => lastPage.nextCursor,
}, {
  staleTime: 300000,
});

export default useUserMessages;
