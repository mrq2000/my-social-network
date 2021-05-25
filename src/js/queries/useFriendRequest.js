import { useQuery } from 'react-query';
import { api } from '../helpers/axios';

const useFriendRequest = () => useQuery('friendRequest', async () => {
  const res = await api.get('/friends/request');
  return res.data;
}, {
  staleTime: 300000,
});

export default useFriendRequest;
