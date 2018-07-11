import * as React from "react";

import { Button, View, Text } from "native-base";

import Wrapper from '../../../components/Wrapper/';

import ReadMore from '../../../components/ReadMore/'
import {handleClick} from '../../../utils/api'
import {tags} from '../../../theme/__'
import styles from "./styles";


import { translate } from 'react-i18next';


export interface Props {
	navigation: any;
}
export interface State {}

@translate(['home', 'common'], { wait: true })
class DetailsTicket extends React.Component<Props, State> {

	openUrl = () => {
		const param = this.props.navigation.state.params;
		handleClick(`offer/${param.offerSlug}`, 'self')
	}

	render() {
		const {t, i18n} = this.props
		const param = this.props.navigation.state.params;
		const data = param.data
		// console.log('---------')
		// console.log(this.props)
		return (
			<Wrapper
				name={param.ticketTitle}
				navigation={this.props.navigation}
				>

				<View padder>
					<Text style={tags.h1}>{data.title} {param.offerSlug}</Text>
					<View style={styles.description}>
						<ReadMore text={data.description_plain} />
					</View>

					<View style={tags.hr} />

					{data.languages && <View style={styles.listBlock}>
						<Text style={styles.listBlockLabel}>Languages:</Text>
						<Text style={styles.listBlockValue}>{data.languages.join(', ')}</Text>
					</View>}

					{data.include && <View style={styles.listBlock}>
						<Text style={styles.listBlockLabel}>Included:</Text>
						<Text style={styles.listBlockValue}>{data.include.join(', ')}</Text>
					</View>}

					<View style={styles.listBlock}>
						<Text style={styles.listBlockLabel}>Price:</Text>
						<Text style={styles.listBlockValue}>{data.bestprice.price} €</Text>
					</View>

					{data.duration && <View style={styles.listBlock}>
						<Text style={styles.listBlockLabel}>Duration:</Text>
						<Text style={styles.listBlockValue}>{data.duration}</Text>
					</View>}


					<Button block border onPress={this.openUrl}>
						<Text>Make an order</Text>
					</Button>

				</View>

			</Wrapper>
		);
	}
}

export default DetailsTicket;
