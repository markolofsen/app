import v from './variables/platform'
import { StyleSheet } from "react-native";

export default {
	...v,
	deviceHeightInner: (v.deviceHeight - v.toolbarHeight - v.footerHeight),
	deviceHeightInnerNoFooter: (v.deviceHeight - v.footerHeight),
	videoDimensionHeight: (v.deviceWidth / 1.77),
	fontSizeTiny: v.fontSizeBase * 0.8,
	sizeIconTiny: v.fontSizeBase * 1.4,
};



export function padding(top=0, right=false, bottom=false, left=false) {
	return {
		paddingTop: top,
		paddingRight: typeof right == 'number' ? right : top,
		paddingLeft: typeof left == 'number' ? left : top,
		paddingBottom: typeof bottom == 'number' ? bottom : top,
	}
}
export function margin(top=0, right=false, bottom=false, left=false) {
	return {
		marginTop: top,
		marginLeft: typeof left == 'number' ? left : top,
		marginRight: typeof right == 'number' ? right : top,
		marginBottom: typeof bottom == 'number' ? bottom : top,
	}
}

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
	},
	padding5: padding(5),

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

export const customTags = {
// export const customTags: any = StyleSheet.create({
	price: {
		...css.borderStyle,
		color: v.brandDanger,
		borderColor: v.brandDanger,
		fontWeight: 'bold',
		padding: 5,
	}
}
