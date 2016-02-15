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

class Forecast extends Component {

  constructor(props) {
    super(props);

    this.state = {
      city: 'Porto',
      country: 'Portugal',
      description: 'Clear',
      temperature: 21,
      searchedCity: 'Porto',
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      watchID: 0
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        this.setState({initialPostion});
      },
      (error) => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });

    this._fetchWeather();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  _fetchWeather() {
    API.fetchWeatherByCityName(this.state.initialPosition).then((response => {
      let city = response.list[0];

      this.setState({
        temperature: city.main.temp,
        city: city.name,
        country: city.sys.country,
        description: city.weather[0].description
      });
    }));
  }

  render() {
    return (
      <Animated.View style={styles.container}>
        <View style={[styles.animatedContainer]}>
          <Text style={styles.description}>
            {this.state.description}
          </Text>

          <Text style={styles.temperature}>
            {Math.round(this.state.temperature) + 'ºC'}
          </Text>

          <TextInput
            style={styles.input}
            clearButtonMode={'always'}
            clearTextOnFocus={true}
            returnKeyType={'search'}
            onChangeText={(text) => this.setState({searchedCity: text})}
            onSubmitEditing={() => this._fetchWeather()}/>
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
    fontSize: 90,
    fontWeight: '100',
    margin: 0
  },
  location: {
    fontSize: 14,
    fontWeight: '100',
    marginBottom: 20,
  },
  description: {
    fontSize: 34,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    height: 40,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  }
});

// IMPORTANT it seems like this can be the only export of the module. Try putting {} around Forecast...
module.exports = Forecast;
