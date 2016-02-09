'use strict';

import React, {
  AppRegistry,
  Component,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';

//var Forecast = require('./Forecast');
import Forecast from 'WeatherProject/src/Forecast';

class WeatherProject extends Component {
	constructor(props) {
		super(props);
		this.state = {zip: '',
									forecast: null};
	}

	// NOTE THIS IS OUTDATED
	// state should be set in constructor
	// getInitialState() {
	// 		return {
	// 				zip: ''
	// 		}
	// }
  _parseResponse(json) {
    return {
      forecast: {
        main: json.weather[0].main,
        description: json.weather[0].description,
        temp: json.main.temp
      }
    };
  }

	_handleTextChange(event) {
		let zip = event.nativeEvent.text;
    let apiKey = 'ec1ae731a4d1582087c424a5b0ed64ea';
		this.setState({zip: zip});
		let uri=`http://api.openweathermap.org/data/2.5/weather?q=${zip}&units=imperial&APPID=${apiKey}`;
    fetch(uri)
      .then((response => response.json()))
      .then((responseJSON) => {
        this.setState(this._parseResponse(responseJSON));
      });
	}

  _renderForecast() {
    if(this.state.forecast != null)
      return(
    	<Forecast
		main={this.state.forecast.main}
		description={this.state.forecast.description}
		    temp={this.state.forecast.temp} />
      );
  }
	render() {
		return (
				<View style={styles.container}>
				<Text style={styles.welcome}>
				You input {this.state.zip}
			</Text>
        {this._renderForecast()}
			  <TextInput
		  style={styles.input}
		  returnKeyType='go'
		  // this is to preserve the "this"
		  onSubmitEditing={(event) => this._handleTextChange(event)} />
			  </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#4D4D4D',
	},
	input: {
		fontSize: 20,
		borderWidth: 2,
		height: 40,
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

module.exports = WeatherProject;
