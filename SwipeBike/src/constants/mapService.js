import {MAPS_API_KEY} from '../../key';
function decode(t, e) {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return (d = d.map(function (t) {
    return {latitude: t[0], longitude: t[1]};
  }));
  // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
}

export async function getRoute(originCoordinates, destinationCoordinates) {
  const mode = 'driving'; // 'walking';
  const origin = originCoordinates;
  const destination = destinationCoordinates;
  const APIKEY = MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

  var route = [];
  console.log('origin', originCoordinates);
  console.log('destination', destinationCoordinates);
  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.routes.length) {
        route = decode(responseJson.routes[0].overview_polyline.points);
      }
    })
    .catch(e => {
      console.log(e);
    });
  return route;
}
