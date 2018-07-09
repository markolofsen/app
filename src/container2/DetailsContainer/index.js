// @flow
import * as React from "react";
import Details from "../../stories/tbook/Details/";

import { View, Text } from 'native-base';
import {Image, TouchableOpacity} from 'react-native';

import { translate } from 'react-i18next';
import {get} from '../../utils/api'
import styles from "./styles";


export interface Props {
	navigation: any,
}
export interface State {}

@translate(['home', 'common'], { wait: true })
export default class DetailsContainer extends React.Component<Props, State> {

	state = {
		data: null,
		meta: null,
		reviews: null,
	}

	componentDidMount() {
		const params = this.props.navigation.state.params
		get(`/api/catalog/tickets/detail/${params.slug}/0/?lang=${this.props.i18n.language}`).then(res => {
			this.setState({
				data: res.results,
				meta: res.meta,
				reviews: res.reviews,
			})
		})
		console.log(`/api/catalog/tickets/detail/${params.slug}/0/?lang=${this.props.i18n.language}`)
	}

	preRender() {
		const params = this.props.navigation.state.params
		const {data} = this.state

		if(!data) {
			return (
				<View>
					<Text>Loading</Text>
				</View>
			)
		}

		let images_arr = []
		data.images.map((item, index) => {
			// images_arr.push({source: { uri: item.normal }})
			images_arr.push({source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' }})
		})

		return (
			<View>

				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('GalleryContainer', {
						navigation: this.props.navigation,
						imagesArr: images_arr,
						PageTitle: data.title,
					})} >

					<Image
					 style={styles.image}
					 source={{ uri: 'https://paragliding4.me/images/pic/paraplan-na-vzlete-advance_1024.jpg' }} />

				</TouchableOpacity>



				<Text>{data.title}</Text>
				<Text>{data.location.city}</Text>
				<Text>{data.description_short}</Text>
				<Text>{data.video}</Text>
				<Text>{data.image_preview}</Text>
				<Text>{data.bestprice.price}</Text>


				{data.categories.map((item, index) => {
					return (
						<View key={index}>
							<Text>{item.name}</Text>
						</View>
					)
				})}
				{data.prices.map((item, index) => {
					return (
						<View key={index}>
							<Text>{item.title}</Text>
						</View>
					)
				})}
				{data.reviews.data.map((item, index) => {
					return (
						<View key={index}>
							<Text>{item.title}</Text>
						</View>
					)
				})}

			</View>
		)
	}

	render() {
		const {data} = this.state
		let PageTitle = data ? data.title : 'Details'

		return <Details navigation={this.props.navigation} detailsBlock={this.preRender()} PageTitle={PageTitle} />;
	}
}
