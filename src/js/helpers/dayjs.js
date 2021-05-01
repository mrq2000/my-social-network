import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';
import 'dayjs/locale/vi';

dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.locale('vi');

export const dayjsFormat = dayjs.utc;
export const formatDateTime = (dateTime) => dayjsFormat(dateTime).format('HH:mm DD/MM/YYYY');
export const formatDateUTC = (dateTime) => dayjsFormat(dateTime).format('DD/MM/YYYY');
export const formatDatabaseDateTime = (dateTime) => dayjs(dateTime).format('YYYY-MM-DD HH:mm');

export const formatLocalDate = (dateTime) => dayjs(dateTime).format('DD/MM/YYYY');
export const formatLocalDateTime = (dateTime) => dayjs(dateTime).format('HH:mm, DD/MM/YYYY');
export const formatLocalDateTimeSameWeek = (dateTime) => dayjs(dateTime).format('dd, HH:mm');
export const formatLocalDateTimeSameDay = (dateTime) => dayjs(dateTime).format('HH:mm');

export const getDifferencePerMinute = (date2, date1) => {
  const dayjs1 = dayjs(date1);

  return Math.abs(dayjs1.diff(date2, 'minute'));
};

// Custom flexible display time
export const getFuckingAwesomeDate = (dateTime) => {
  const dateNow = dayjs();

  if (Math.abs(dateNow.diff(dateTime, 'week')) > 0) {
    return formatLocalDateTime(dateTime);
  }

  if (Math.abs(dateNow.diff(dateTime, 'day')) > 0) {
    return formatLocalDateTimeSameWeek(dateTime);
  }

  return formatLocalDateTimeSameDay(dateTime);
};
