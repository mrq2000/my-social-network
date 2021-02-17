import { useQuery } from 'react-query';
import { api } from '../helpers/axios';

const useMyPage = () => useQuery('my-page', async () => {
  const res = await api.get('/my-page');
  return res.data;
}, {
  staleTime: 300000,
});

export default useMyPage;
