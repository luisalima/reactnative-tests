'use strict';

import React, {
  Animated,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import API from 'WeatherProject/src/Api';

// constants used for background colors
var BG_HOT  = '#fb9f4d';
var BG_WARM = '#fbd84d';
var BG_COLD = '#00abe6';

class Forecast extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coords: {
        lat: 0,
        lon: 0
      },
      weather: {
        description: '',
        temperature: 0
      },
      country: '',
      city: '',
      backgroundColor: '#fff'
    };
  }

  /**
   * When this component mount, seach the weather for the user's current
   * location.
   */
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        API.fetchWeatherByGeoCoords(position.coords).then((response => {

          // choose appropriate background color based on temperature
          let temp = parseInt(response.main.temp);
          if(temp < 14) {
            this.setState({backgroundColor: BG_COLD});
          }
          else if(temp >= 14) {
            this.setState({backgroundColor: BG_WARM});
          }
          else {
            this.setState({backgroundColor: BG_HOT});
          }

          this.setState({
            coords: {
              lat: response.coord.lat,
              lon: response.coord.lon
            },
            weather: {
              temperature: response.main.temp,
              description: response.weather[0].description
            },
            country: response.sys.country.toUpperCase(),
            city: response.name.toUpperCase()
          });
        }));
      },
      (error) => {
        console.log(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  render() {
    return (
      <Animated.View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
        <View style={[styles.animatedContainer]}>
          <Text style={styles.temperature}>
            {Math.round(this.state.weather.temperature) + 'ºC'}
          </Text>

          <Text style={styles.location}>
            {this.state.city + ', ' + this.state.country}
          </Text>

          <Text style={styles.description}>
            {this.state.weather.description}
          </Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  temperature: {
    fontSize: 70,
    fontWeight: '100',
    margin: 0
  },
  location: {
    fontSize: 15,
    fontWeight: '100',
    marginBottom: 20,
  },
  description: {
    fontSize: 34,
    fontWeight: '500'
  }
});

// IMPORTANT it seems like this can be the only export of the module. Try putting {} around Forecast...
module.exports = Forecast;
