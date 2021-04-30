import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(utc);
dayjs.extend(isoWeek);

export const dayjsFormat = dayjs.utc;
export const formatDateTime = (dateTime) => dayjsFormat(dateTime).utc().format('HH:mm DD/MM/YYYY');
export const formatLocalDateTime = (dateTime) => dayjs(dateTime).format('HH:mm DD/MM/YYYY');
export const formatDateUTC = (dateTime) => dayjsFormat(dateTime).utc().format('DD/MM/YYYY');
export const formatLocalDate = (dateTime) => dayjsFormat(dateTime).format('DD/MM/YYYY');

export const formatDatabaseDateTime = (dateTime) => dayjs(dateTime).format('YYYY-MM-DD HH:mm');

export const getYear = (dateTime) => new Date(dateTime).getFullYear();
export const getMonth = (dateTime) => new Date(dateTime).getMonth();
export const getDate = (dateTime) => new Date(dateTime).getDate();
export const getWeek = (dateTime) => dayjs(dateTime).isoWeek();
export const getDay = (dateTime) => dayjs(dateTime).isoWeekday();

export const getDifferencePerMinute = (date1, date2) => {
  const dayjs1 = dayjs(date1);
  return dayjs1.diff(date2, 'minute', true);
};
