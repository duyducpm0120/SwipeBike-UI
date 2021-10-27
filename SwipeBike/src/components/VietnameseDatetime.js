import moment from 'moment';
import 'moment/locale/vi';
export default function getVietnameseDatetime(date) {
  moment.locale('vi');
  return moment(date).format('LL');
}
