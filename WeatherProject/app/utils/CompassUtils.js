'use strict';

module.exports = {
  /**
   * Convert the given value in degrees to its compass designation.
   */
  convertDegToCompass: function(degrees) {
    // Possible directions
    let directions = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW',
                      'WSW','W','WNW','NW','NNW'];

    // There is an angle change at every 22.5 degrees
    let base_angle = 22.5;

    // Add .5 so that when the value is truncated we can break the 'tie' between
    // the change threshold
    let value = parseInt((degrees / base_angle) + 0.5);

    return directions[value % directions.length];
  }
};
