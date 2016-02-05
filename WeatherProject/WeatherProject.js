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
import Forecast from 'WeatherProject/Forecast';

class WeatherProject extends Component {
		constructor(props) {
				super(props);
				this.state = {zip: '',
											forecast: {
													main: 'Clouds',
													description: 'few clouds',
													temp: 45.7} }
		}

		// NOTE THIS IS OUTDATED
		// state should be set in constructor
		// getInitialState() {
		// 		return {
		// 				zip: ''
		// 		}
		// }
		_handleTextChange(event) {
				let zip = event.nativeEvent.text;
				this.setState({zip: zip});

				let uri=`http://api.openweathermap.org/data/2.5/weather?q=${zip}&units=imperial`
				console.log(uri);
		}

		render() {
				console.log(Forecast);
				return (
								<View style={styles.container}>
								<Text style={styles.welcome}>
								You input {this.state.zip}
						</Text>
								<Forecast
						main={this.state.forecast.main}
						description={this.state.forecast.description}
						temp={this.state.forecast.temp} />
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
