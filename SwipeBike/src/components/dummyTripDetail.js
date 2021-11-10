import {IMAGES} from '../constants';

export const waitingTripDetail = {
  driver: {
    name: 'Duong Thanh Vuong',
    image: IMAGES.cuteDriver,
  },
  passenger: null,
  dateTime: '3 Nov 2021 7:00:00',
  from: {
    name: 'Nhan van',
    coordinate: [10.8722574, 106.8020436],
  },
  to: {
    name: 'CNTT',
    coordinate: [10.8697981, 106.8028301],
  },
};

export const pairingTripDetail = {
  driver: {
    name: 'Duong Thanh Vuong',
    image: IMAGES.cuteDriver,
  },
  passenger: {name: 'Oanhhhhhhhhhhhhhhhhh', image: IMAGES.swipeBike},
  dateTime: '3 Nov 2021 7:00:00',
  from: {
    name: 'Nhan van',
    coordinate: [10.8722574, 106.8020436],
  },
  to: {
    name: 'CNTT',
    coordinate: [10.8697981, 106.8028301],
  },
};
