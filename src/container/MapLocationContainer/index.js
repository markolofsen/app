// @flow
import * as React from "react";
import PropTypes from 'prop-types';
import MapLocation from "../../stories/screens/MapLocation";

import { observer, inject } from "mobx-react/native";

import { StatusBar, } from 'react-native';
import { Text, View, Button, Item, Input, Icon, Form, Toast } from 'native-base';
import { MapView, Location, Permissions } from 'expo';

import styles from "./styles";


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

@inject("loginForm")
@observer
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

  componentDidMount() {
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

   apply() {
     this.refreshAddress()
     alert('Refreshed!')
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

  getAddress() {
    alert('yyy!()')
  }

	render() {
		// const form = this.props.loginForm;
		// const {mapType} = this.props
		//
		const {addressData} = this.state

    const form = this.props.loginForm;

		const Fields = (
			<View>
        <Text>{form.AGA}</Text>
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

          onPress={event => this.onUserPress(event.nativeEvent.coordinate)}
          onLongPress={event => this.onUserPress(event.nativeEvent.coordinate)}

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


        <Text>
          {addressData.name}
        </Text>
        <Text>
          {addressData.city}{addressData.city && ','} {addressData.country}
        </Text>

			</View>
		);

		return <MapLocation navigation={this.props.navigation} orderForm={Fields} getAddress={this.getAddress} onApply={() => {this.apply()}} />;
	}
}
