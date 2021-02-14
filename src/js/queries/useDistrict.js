import { useQuery } from 'react-query';
import axios from 'axios';

const useDistrict = (id) => useQuery(['district', id], async () => {
  const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`);
  return res.data;
}, {
  staleTime: Infinity,
  cacheTime: 7200000,
});

export default useDistrict;
