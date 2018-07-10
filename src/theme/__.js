import v from './variables/platform'
import { StyleSheet } from "react-native";

export default {
	...v,
	deviceHeightInner: (v.deviceHeight - v.toolbarHeight - v.footerHeight),
	videoDimensionHeight: (v.deviceWidth / 1.77),
	fontSizeTiny: v.fontSizeBase * 0.8,
	sizeIconTiny: v.fontSizeBase * 1.4,
};




export const css = {
	shadow2p: {
		shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'rgba(0,0,0, .3)',
    shadowOffset: { height: 1, width: 1 },
	},
	borderStyle: {
		borderWidth: v.borderWidth,
		borderRadius: v.borderRadiusBase,
		borderStyle: 'solid',
		borderColor: v.cardBorderColor,
	}
}

export const tags: any = StyleSheet.create({
	h1: {
		fontSize: v.fontSizeH1
	},
	h2: {
		fontSize: v.fontSizeH2
	},
	h3: {
		fontSize: v.fontSizeH3,
		fontWeight: 'bold',
	},
	icon: {
		fontSize: v.iconSizeSmall,
		marginRight: 5,
	},
	hr: {
		backgroundColor: v.cardBorderColor,
		height: .5,
		width: '100%',
	}

});

export const customTags: any = StyleSheet.create({
	price: {
		...css.borderStyle,
		color: v.brandDanger,
		borderColor: v.brandDanger,
		fontWeight: 'bold',
		padding: 5,
	}
})
