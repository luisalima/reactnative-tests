'use strict';

module.exports = {

  /**
   * Convert the specified time in unit time format to the `hh:mm` format.
   */
  formatTime: function(unix_time) {
    // The argument must be in miliseconds instead of seconds
    let date = new Date(unix_time * 1000);
    let h    = date.getHours();
    let m    = date.getMinutes();

    return `${h}:${m}`;
  }
};
