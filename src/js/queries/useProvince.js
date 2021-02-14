import { useQuery } from 'react-query';
import axios from 'axios';

const useProvince = () => useQuery('province', async () => {
  const res = await axios.get('https://vapi.vnappmob.com/api/province/');
  return res.data;
}, {
  staleTime: Infinity,
  cacheTime: 7200000,
});

export default useProvince;
