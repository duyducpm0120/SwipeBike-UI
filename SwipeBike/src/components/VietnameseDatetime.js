import moment from 'moment';
import 'moment/locale/vi';
export function getVietnameseDate(date) {
  moment.locale('vi');
  return moment(new Date(date)).format('LL');
}
export function getVietnameseTime(date) {
  moment.locale('vi');
  return moment(new Date(date)).format('h:mm A');
}
