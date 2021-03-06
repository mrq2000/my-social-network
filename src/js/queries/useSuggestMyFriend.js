import { useInfiniteQuery } from 'react-query';
import { api } from '../helpers/axios';

const useProvince = (keyword, limit) => useInfiniteQuery(['suggest', 'my-friends', keyword, limit], async ({ pageParam = 0 }) => {
  if (keyword === '') return [];

  const res = await api.get('/suggest/my-friends', {
    params: {
      keyword,
      limit,
      offset: pageParam * limit,
    },
  });
  return res.data;
},
{
  staleTime: Infinity,
  cacheTime: 7200000,
  getNextPageParam: (lastPage, allPage) => (
    lastPage.length >= limit ? allPage.length * limit : false),
});

export default useProvince;
