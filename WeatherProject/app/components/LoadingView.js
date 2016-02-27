'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import WeatherIcon from 'WeatherProject/app/utils/WeatherIconUtils';

import * as layoutStyles     from 'WeatherProject/app/styles/layout';
import * as typographyStyles from 'WeatherProject/app/styles/typography';

class LoadingView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={layoutStyles.center}>
        <Text style={typographyStyles.weatherIcon}>
          {WeatherIcon()}
        </Text>
      </View>
    );
  }
}

module.exports = LoadingView;
