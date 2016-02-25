'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Units       from 'WeatherProject/data/units.json';
import Utils       from 'WeatherProject/src/Utils';
import WeatherIcon from 'WeatherProject/src/WeatherIcons';

class Forecast extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: WeatherIcon()
    };
  }

  _renderBasicWeatherData() {
    return (
      <View style={styles.section}>
        <Text style={styles.location}>
          {this.props.weatherData.name + ', ' + this.props.weatherData.sys.country}
        </Text>

        <Text style={styles.text}>
          {this.props.weatherData.weather[0].description}
        </Text>

        <Text style={styles.icon}>
          {WeatherIcon(this.props.weatherData.weather[0].icon)}
        </Text>

        <Text style={styles.temperature}>
          {Math.round(this.props.weatherData.main.temp) + 'º'}
        </Text>
      </View>
    );
  }

  _renderWeatherDetails() {
    return (
      <View style={styles.section}>
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
            ' ' +
            Units.speed[this.props.units]
          }
        </Text>

        <Text style={styles.text}>
          {'Pressure: ' +
            Math.round(this.props.weatherData.main.pressure) +
            ' ' +
            Units.pressure
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
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: '400'
  },
  location: {
    fontSize: 50,
    fontWeight: '400',
    marginBottom: 5
  },
  temperature: {
    fontSize: 110,
    fontWeight: '200',
    marginTop: 10
  },
  icon: {
    fontFamily: 'WeatherIcons-Regular',
    fontSize: 130,
    padding: 0
  }
});

// IMPORTANT it seems like this can be the only export of the module. Try putting {} around Forecast...
module.exports = Forecast;
