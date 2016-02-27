'use strict';

import React, {
  AsyncStorage,
  Component,
  PickerIOS,
  StyleSheet,
  View
} from 'react-native';

class SettingsView extends Component {

  constructor(props) {
    super(props);

    this.STORAGE_KEY  = '@SettingsAsyncStorage:units';
    this.UNIT_FORMATS = ['metric', 'imperial'];

    this.state = {
      selectedUnitsFormat: this.UNIT_FORMATS[0]
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    try {
      let unitsFormat = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (unitsFormat !== null) {
        this.setState({ selectedUnitsFormat: unitsFormat });
      }
    }
    catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View>
        <PickerIOS
          selectedValue={this.state.selectedUnitsFormat}
          onValueChange={this._onValueChange.bind(this)}>
          {this.UNIT_FORMATS.map((value) => (
            <PickerIOS.Item
              key={value}
              value={value}
              label={value}
            />
          ))}
        </PickerIOS>
      </View>
    );
  }

  async _onValueChange(selectedUnitsFormat) {
    this.setState({ selectedUnitsFormat });
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, selectedUnitsFormat);
    }
    catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = SettingsView;
