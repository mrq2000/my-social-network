import { useQuery } from 'react-query';
import { api } from '../helpers/axios';

const useMyPage = (userId) => useQuery(['users page', userId], async () => {
  const res = await api.get(`/users/${userId}/page`);
  return res.data;
}, {
  staleTime: 300000,
});

export default useMyPage;
