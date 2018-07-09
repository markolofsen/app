// @flow
import * as React from "react";
import Details from "../../stories/tbook/Details/";

import { View, Text } from 'native-base';


import { translate } from 'react-i18next';
import {get} from '../../utils/api'
import styles from "./styles";

import Gallery from 'react-native-image-gallery';

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
				<Text>{data.title}</Text>
				<Text>{data.location.city}</Text>
				<Text>{data.description_short}</Text>
				<Text>{data.video}</Text>
				<Text>{data.image_preview}</Text>

				<Gallery
		        style={{ flex: 1, backgroundColor: 'black' }}
						images={images_arr}
		      />

			</View>
		)
	}

	render() {
		return <Details navigation={this.props.navigation} detailsBlock={this.preRender()} />;
	}
}
