import moment from 'moment';
import 'moment/locale/vi';
export function getVietnameseDate(date) {
  moment.locale('vi');
  return moment(date).format('LL');
}
export function getVietnameseTime(date) {
  moment.locale('vi');
  return moment(date).format('h:mm A');
}
