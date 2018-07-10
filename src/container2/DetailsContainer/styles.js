import { StyleSheet } from 'react-native'

import __, {css} from '../../theme/__'



const imageWrapper = {
	flex: 1,
	alignItems: 'flex-start',
	justifyContent: 'flex-end',

	width: '100%',
}
export default {
	imageWrapper: {
		...imageWrapper,
		height: __.videoDimensionHeight,
	},
	imageWrapperON: {
		...imageWrapper,
		height: __.videoDimensionHeight + 50,
	},

	imageButtons: {
		paddingLeft: 10,
		paddingBottom: 10,
		zIndex: 10,
		display: 'flex',
		flexDirection: 'row',
	},
	imageButtonsBtn: {
		...css.shadow2p,
		marginRight: 10,
	},


	imageTouch: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: __.videoDimensionHeight,
	},
	image: {
		width: '100%',
		height: '100%',

		backgroundColor: '#ccc',
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},

	categoryWrapper: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	categoryBtn: {
		height: 20,
		marginRight: 5,
		marginBottom: 5,
	},


	subtitle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		paddingTop: 10,
		paddingBottom: 10,
		marginBottom: 20,
	},
	subtitleLocation: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},

	subtitlePrice: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},

}
