import { StyleSheet } from "react-native";

import variables from "../../theme/variables/platform";

const styles: any = StyleSheet.create({
	comment: {
		width: '100%',
		fontSize: variables.inputFontSize,
		color: variables.inputColor,
		margin: 0,
		paddingLeft: 5,
		paddingRight: 5,
		minHeight: 100,
	},
	textInput: {
		width: '100%',
		fontSize: variables.inputFontSize,
		color: variables.inputColor,
		margin: 0,
		paddingLeft: 5,
		paddingRight: 5,
	},
});
export default styles;
