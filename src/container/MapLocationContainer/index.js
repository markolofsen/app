// @flow
import * as React from "react";
import MapLocation from "../../stories/screens/MapLocation";

import { Item, Input, Icon, Form, Toast } from "native-base";
import { observer, inject } from "mobx-react/native";

import { Text, View, Button, StatusBar, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import { StackNavigator, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };


async function getAddress() {
  console.log('Asking for Permissions...');
  let { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === 'granted') {
    console.log('Permission granted.');

    let position = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    let location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    try {
      let res = await Location.reverseGeocodeAsync(location);
      console.log('Address found: ', res[0]);
      return JSON.stringify(res[0]);
    } catch (err) {
      console.log('Error: ', err);
      throw new Error(err);
    }
  } else {
    console.log('Permission denied.');
  }
}

export interface Props {
	navigation: any,
}
export interface State {}
export default class MapLocationContainer extends React.Component<Props, State> {

	constructor(props) {
	    super(props);

	    this.state = {
				value: 'ok',

        location: false,

        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        },

        addressData: {
          street: '',
        }
	    }

	    this.refreshAddress = this.refreshAddress.bind(this);
      this.onUserPress = this.onUserPress.bind(this)
      this.onUserPinDragEnd = this.onUserPinDragEnd.bind(this)
	  }

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

	async refreshAddress() {
		 this.setState({
			 address: 'Refreshing address...'
		 });
		 console.log('Refreshing address...');
		 let newAddress = '';
		 try {
			 newAddress = await getAddress();
		 } catch(err) {
			 newAddress = 'Error: ' + err;
		 }
		 this.setState({
			 address: newAddress
		 });

	 }

	 async componentDidMount() {
		 await this.refreshAddress();
	 }

  locationChanged = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    },
    // console.log(location)
    this.setState({location, region}, () => {})
  }

	handleInput = (value) => {
		this.setState({value: value})
	}

  async onUserPinDragEnd() {
    // Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);

    this.clearData()

    await Location.reverseGeocodeAsync({
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
    }).then(res => {
      const a = JSON.stringify(res[0])
      // console.log(a)
      this.setState({addressData: res[0]})
    });


    // console.log(getAddress())
    console.log('END')
  }

  clearData() {
    let newData = this.state.addressData
        newData.name = ''
    this.setState({addressData: newData}, () => {})

  }

  onUserPress = (e) => {

    let newState = this.state.region
    newState.latitude = e.latitude
    newState.longitude = e.longitude
    this.setState({region: newState})

    this.onUserPinDragEnd()

  }


	render() {
		// const form = this.props.loginForm;

		const Fields = (
			<View>
				<MapView
	        style={{ flex: 1, width: '100%', height: 300 }}

          // initialRegion={this.state.region}
	        initialRegion={{
            latitude: 28.055368569928238,
            longitude: -16.720001266170858,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
          style={{ alignSelf: 'stretch', height: 400 }}
          // region={this.state.region}
          // onRegionChange={this._handleMapRegionChange}
					// minZoomLevel={5}
					// maxZoomLevel={30}
					scrollEnabled={true}
					showsMyLocationButton={false}
      		showsUserLocation={true}
          followsUserLocation={false}
          loadingEnabled={true}
          userLocationAnnotationTitle=""
          // onPress={this.onUserPress}
          onPress={event =>
            this.onUserPress(event.nativeEvent.coordinate)
          }
          isDragging={false}
          >
					<MapView.Marker
							draggable
							// coordinate={this.state.marker}
              coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
              onDragEnd={this.onUserPinDragEnd}
							title={'From'}
							description={this.state.addressData.name}
						/>
        </MapView>

				<Expo.MapView
          style={{ flex: 0.5 }}
          showsUserLocation={true}
          region={this.state.region}
        />

				<Button
          title="Home Refresh"
          onPress={this.refreshAddress}
          style={{ marginBottom: 10 }} />
        <Text>
          {this.state.address}
        </Text>

				<Text>1</Text>
				<Form>
					<Item error={false}>
						<Icon active name="place" />
						<Input
							placeholder="!"
							keyboardType="email-address"
							ref={c => (this.emailInput = c)}
							value={this.state.value}
							onBlur={() => {}}
							onChangeText={(e) => { this.handleInput(e) }}
						/>
					</Item>
				</Form>
			</View>
		);

		return <MapLocation navigation={this.props.navigation} orderForm={Fields} />;
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
