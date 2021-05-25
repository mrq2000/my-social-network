import { useQuery } from 'react-query';
import { api } from '../helpers/axios';

const useUserPage = (userId) => useQuery(['user', userId, 'page'], async () => {
  const res = await api.get(`/users/${userId}/page`);
  return res.data;
}, {
  staleTime: 300000,
});

export default useUserPage;
