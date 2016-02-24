'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Units from 'WeatherProject/data/units.json';
import Utils from 'WeatherProject/src/Utils';

class Forecast extends Component {

  constructor(props) {
    super(props);
  }

  _renderBasicWeatherData() {
    return (
      <View style={[styles.section]}>
        <Text style={styles.location}>
          {this.props.weatherData.name + ', ' + this.props.weatherData.sys.country}
        </Text>

        <Text style={styles.text}>
          {this.props.weatherData.weather[0].description}
        </Text>

        <Text style={styles.temperature}>
          {Math.round(this.props.weatherData.main.temp) + 'º'}
        </Text>
      </View>
    );
  }

  _renderWeatherDetails() {
    return (
      <View style={[styles.section]}>
        <Text style={styles.text}>
          {`Sunrise: ${Utils.formatTime(this.props.weatherData.sys.sunrise)}`}
        </Text>

        <Text style={styles.text}>
          {`Sunset: ${Utils.formatTime(this.props.weatherData.sys.sunset)}`}
        </Text>

        <Text style={styles.text}>
          {'Wind: ' +
            Utils.convertDegToCompass(this.props.weatherData.wind.deg) +
            ' ' +
            this.props.weatherData.wind.speed +
            Units.speed[this.props.units]
          }
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.container]}>
        {this._renderBasicWeatherData()}
        {this._renderWeatherDetails()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  section: {
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 0.75,
    borderStyle: 'solid',
    justifyContent: 'center',
    padding: 5,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '400'
  },
  location: {
    color: '#fff',
    fontSize: 50,
    fontWeight: '400',
    marginBottom: 5
  },
  temperature: {
    color: '#fff',
    fontSize: 110,
    fontWeight: '200',
    marginTop: 10
  },
});

// IMPORTANT it seems like this can be the only export of the module. Try putting {} around Forecast...
module.exports = Forecast;
