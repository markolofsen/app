import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Constants } from 'expo';

import { Button, Text, View } from "native-base";


import moment from 'moment';

// You can import from local files
// import AssetExample from '../../../components/AssetExample';

//link documentacion de el picker ademas tambien tiene el data picker
//https://github.com/mmazzarolo/react-native-modal-datetime-picker

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

import DateTimePicker from 'react-native-modal-datetime-picker';



import styles from "./styles";

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
    selected_date: false
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();

    const d = moment(date).format("YYYY-MM-DD in HH:mm");
    this.setState({selected_date: d})
  };

  render () {

    const {selected_date} = this.state

    // Create new Date instance
    const today = new Date()
    // const minimumDate = new Date(today.getHours() + 1);
    const minimumDate = new moment(today).add(1, 'h').toDate();
    const maximumDate = new moment(today).add(7, 'd').toDate();


    return (
      <View style={{ flex: 1 }}>

        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Button transparent
            onPress={this._showDateTimePicker}
            >
            <Text style={styles.textInput}>
              {selected_date ? selected_date : 'When?'}
            </Text>
          </Button>
        </TouchableOpacity>


        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          datePickerModeAndroid="spinner"
          mode="datetime"
          is24Hour={true}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          minuteInterval={10}
        />

      </View>
    );
  }

}
