import { useQuery } from 'react-query';
import { api } from '../helpers/axios';

const useUserList = (userIds) => useQuery(['userList', userIds], async () => {
  const res = await api.get('users/list', {
    params: {
      userIds: JSON.stringify(userIds),
    },
  });
  return res.data;
}, {
  staleTime: 300000,
});

export default useUserList;
