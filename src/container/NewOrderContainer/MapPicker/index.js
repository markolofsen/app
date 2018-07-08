import React, { Component } from 'react';

import { Button, Text, View } from "native-base";

import styles from "./styles";


export interface Props {
	navigation: any,
}
export interface State {}
export default class MapPicker extends Component<Props, State> {


  render () {

    return (
      <View style={{ flex: 1 }}>
        <Button transparent
          onPress={() => this.props.navigation.navigate('MapLocation')}>
          <Text style={styles.textInput}>From</Text>
        </Button>
      </View>
    );
  }
}
