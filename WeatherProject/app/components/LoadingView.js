'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class LoadingView extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Fetching Weather...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: '#666666',
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center'
  }
});

module.exports = LoadingView;
