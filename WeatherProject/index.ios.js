'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import API          from 'WeatherProject/src/Api';
import ForecastView from 'WeatherProject/src/ForecastView';
import LoadingView  from 'WeatherProject/src/LoadingView';

// constants used for background colors
let BG_HOT  = '#fb9f4d';
let BG_WARM = '#fbd84d';
let BG_COLD = '#00abe6';

class WeatherProject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weatherData: null,
      backgroundColor: '#fff',
      selectedTab: 'forecast'
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
          console.log(response);

          this.setState({
            weatherData: response,
            backgroundColor: this._chooseBackgroundColor(parseInt(response.main.temp))
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

  /**
    * Choose appropriate background color based on temperature.
    */
  _chooseBackgroundColor(temp) {

    let bg;
    if(temp < 14) {
      bg = BG_COLD;
    }
    else if(temp >= 14) {
      bg = BG_WARM;
    }
    else {
      bg = BG_HOT;
    }

    return bg;
  }

  /**
   * If this.state.weatherData is undifined, renders a LoadingView; otherwise,
   * this method renders the ForecastScreen.
   */
  _renderForecastView() {
    if(!this.state.weatherData) {
      return (
        <LoadingView />
      );
    }

    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
        <ForecastView
          description={this.state.weatherData.weather[0].description}
          city={this.state.weatherData.name}
          country={this.state.weatherData.sys.country}
          temperature={this.state.weatherData.main.temp} />
      </View>
    );
  }

  render() {
    return (
      <TabBarIOS
        tintColor='white'
        translucent={true}>
        <TabBarIOS.Item
          title='Forecast'
          systemIcon='recents'
          selected={this.state.selectedTab === 'forecast'}
          onPress={() => {
            this.setState({
              selectedTab: 'forecast',
            });
          }}>
          {this._renderForecastView()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'flex-start'
  },
});

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
