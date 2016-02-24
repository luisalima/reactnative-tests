'use strict';

import React, {
  AppRegistry,
  AsyncStorage,
  Component,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import API          from 'WeatherProject/src/Api';
import ForecastView from 'WeatherProject/src/ForecastView';
import Icon         from 'react-native-vector-icons/FontAwesome';
import LoadingView  from 'WeatherProject/src/LoadingView';
import SearchView   from 'WeatherProject/src/SearchView';
import SettingsView from 'WeatherProject/src/SettingsView';

let STORAGE_KEY  = '@SettingsAsyncStorage:units';

class WeatherProject extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'forecast',
      unitsFormat: 'metric',
      weatherData: null,
    };
  }

  async _loadSelectedUnitsFormat() {
    try {
      let selectedFormat = await AsyncStorage.getItem(STORAGE_KEY);
      if (selectedFormat !== null) {
        this.setState({ unitsFormat: selectedFormat });
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  /**
   * When this component mount, seach the weather for the user's current
   * location.
   */
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        // Start by loading the selected units format and only after that fetch
        // the weather, providing the `position` and the selected units format.
        this._loadSelectedUnitsFormat().done(() => (
          API.fetchWeatherByGeoCoords(position.coords, this.state.unitsFormat).then((response => {
            this.setState({ weatherData: response });
          }))
        ));
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

  _renderSettingsView() {
    return (
      <SettingsView />
    );
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
      <View style={[styles.container]}>
        <ForecastView
          units={this.state.unitsFormat}
          weatherData={this.state.weatherData} />
      </View>
    );
  }

  _renderSearchView() {
    return (
      <SearchView />
    );
  }

  render() {
    return (
      <TabBarIOS
        tintColor='white'
        translucent={true}>
        <Icon.TabBarItem
          title=''
          iconName='cog'
          selected={this.state.selectedTab === 'settings'}
          onPress={() => {
            this.setState({
              selectedTab: 'settings',
            });
          }}>
          {this._renderSettingsView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title=''
          iconName='location-arrow'
          selected={this.state.selectedTab === 'forecast'}
          onPress={() => {
            this.setState({
              selectedTab: 'forecast',
            });
          }}>
          {this._renderForecastView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title=''
          iconName='list-ul'
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
          {this._renderSearchView()}
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: 'whitesmoke',
    flex: 1,
    justifyContent: 'flex-start'
  },
});

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
