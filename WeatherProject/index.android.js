/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
} from 'react-native';

import ForecastScreen from 'WeatherProject/src/Forecast';

class WeatherProject extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ForecastScreen />
    );
  }
}

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
