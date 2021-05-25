import { useQuery } from 'react-query';
import { api } from '../helpers/axios';

const useUserInfo = (userId) => useQuery(['user', userId], async () => {
  const res = await api.get(`/users/info/${userId}`);
  return res.data;
}, {
  staleTime: 300000,
});

export default useUserInfo;
