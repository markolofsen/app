import { StyleSheet } from "react-native";


// import { Constants } from 'expo';
// import Dimensions from 'Dimensions';

// const {width, height: windowHeight } = Dimensions.get('window');

import __ from '../../../theme/__'

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "black",
	},
	gallery: {
		flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
		height: __.deviceHeight - __.toolbarHeight,
	}
});
export default styles;
