// @flow
import * as React from "react";
import NewOrder from "../../stories/screens/NewOrder";

import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';


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
export default class NewOrderContainer extends React.Component<Props, State> {
	state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });

   // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };
	render() {
		// const form = this.props.loginForm;

		const Fields = (
			<View style={styles.container}>
        <Text style={styles.paragraph}>
          Pan, zoom, and tap on the map!
        </Text>

        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView
              style={{ alignSelf: 'stretch', height: 400 }}
              region={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}
							minZoomLevel={5}
							maxZoomLevel={30}
							scrollEnabled={true}
							showsMyLocationButton={true}
          		showsUserLocation={true} >
							<MapView.Marker
									draggable={true}
									key={1}
									coordinate={{latitude: 52.36, longitude: 4.88}}
									title={"Some Title"}
									description={"Hello world"}
								/>
            </MapView>
        }

        <Text>
          Location: {this.state.locationResult}
        </Text>
      </View>
		);

		return <NewOrder navigation={this.props.navigation} orderForm={Fields} />;
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
