import { StyleSheet } from "react-native";

import __, {css} from '../../../theme/__'


const styles: any = StyleSheet.create({

	container: {
		backgroundColor: "#FBFAFA",
	},
	description: {
		paddingTop: 30,
		paddingBottom: 20,
	},
	listBlock: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		marginTop: 10,
		marginBottom: 10,
	},
	listBlockLabel: {
		fontWeight: 'bold',
		width: '30%',
	},
	listBlockValue: {
		flex: 1,
		flexWrap: 'wrap',
	}
});
export default styles;
