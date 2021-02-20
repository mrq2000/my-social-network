import { useQuery } from 'react-query';
import { api } from '../helpers/axios';

const useMyPage = (offset = 0, limit = 8) => useQuery(['my-posts', offset, limit], async () => {
  const res = await api.get('/my-posts', {
    params: {
      offset, limit,
    },
  });
  return res.data;
}, {
  staleTime: 300000,
});

export default useMyPage;
