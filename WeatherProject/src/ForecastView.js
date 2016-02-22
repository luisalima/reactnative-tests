'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Forecast extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.location}>
          {this.props.city + ', ' + this.props.country}
        </Text>

        <Text style={styles.description}>
          {this.props.description}
        </Text>

        <Text style={styles.temperature}>
          {Math.round(this.props.temperature) + 'º'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },
  description: {
    color: '#fff',
    fontSize: 30,
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
