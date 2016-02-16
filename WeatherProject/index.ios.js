/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

import ForecastScreen from 'WeatherProject/src/Forecast';

class WeatherProject extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Current location',
          component: ForecastScreen
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
