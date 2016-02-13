'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Forecast extends Component {
  render() {
    return(
      <View>
        <Text style={styles.bigText}>
          {this.props.main}
        </Text>
        <Text style={styles.mainText}>
          Current conditions:
          {this.props.description}
        </Text>
        <Text style={styles.bigText}>
          {this.props.temp} F
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFF',
  },
});

// IMPORTANT it seems like this can be the only export of the module. Try putting {} around Forecast...
module.exports = Forecast;
