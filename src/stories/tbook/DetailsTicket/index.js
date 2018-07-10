import * as React from "react";

import { Button, View, Text } from "native-base";

import Wrapper from '../../../components/Wrapper/';

import {handleClick} from '../../../utils/api'
import {tags} from '../../../theme/__'
import styles from "./styles";


export interface Props {
	navigation: any;
}
export interface State {}
class DetailsTicket extends React.Component<Props, State> {
	render() {
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
					<Text style={tags.h1}>{data.title}</Text>
					<Text style={styles.description}>{data.description_plain}</Text>

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


					<Button block border onPress={() => handleClick('http://ya.ru')}>
						<Text>Make an order</Text>
					</Button>

				</View>

			</Wrapper>
		);
	}
}

export default DetailsTicket;
