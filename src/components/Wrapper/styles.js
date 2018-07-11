import { StyleSheet } from "react-native";
import __ from '../../theme/__'


const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
	},

	infiniteScroll: {
		height: __.deviceHeightInner,
	},
	infiniteScrollNoFooter: {
		height: __.deviceHeightInnerNoFooter,
	}

});
export default styles;
