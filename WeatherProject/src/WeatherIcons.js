'use strict';

export default function(iconCode) {

  let map = {
    // clear sky
    '01d': '\uf00d',
    '01n': '\uf077',

    // few clouds
    '02d': '\uf002',
    '02n': '\uf086',

    // scattered clouds
    '03d': '\uf041',
    '03n': '\uf041',

    // broken clouds
    '04d': '\uf013',
    '04n': '\uf031',

    // shower rain
    '09d': '\uf019',
    '09n': '\uf028',

    // rain
    '10d': '\uf008',
    '10n': '\uf028',

    // thunderstorm
    '11d': '\uf016',
    '11n': '\uf016',

    // snow
    '13d': '\uf064',
    '13n': '\uf016',

    // mist
    '50d': '\uf014',
    '50n': '\uf014'
  };

  return map[iconCode] || '\uf04c';
}
