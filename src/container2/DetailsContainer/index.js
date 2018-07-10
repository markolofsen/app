// @flow
import * as React from "react";
import Details from "../../stories/tbook/Details/";


import { Button, View, Text, Icon } from 'native-base';
import {Image, TouchableOpacity} from 'react-native';
import Preloader from '../../components/Preloader/'
import ReadMore from '../../components/ReadMore/'
import YoutubePlayer from '../../components/YoutubePlayer/'
import Tickets from './Tickets/'
import ReviewsBlock from '../ReviewsContainer/ReviewsBlock'


import { translate } from 'react-i18next';
import {get} from '../../utils/api'

import styles from "./styles";
import __, {tags, customTags} from '../../theme/__'


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

		videoToggler: false,
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

	imageVideoToggler = (s) => {
		this.setState({videoToggler: s})
		if(!s) {
			this.openGallery()
		}
	}
	openGallery = () => {
		const {data} = this.state

		let images_arr = []
		data.images.map((item, index) => {
			// images_arr.push({source: { uri: item.normal }})
			images_arr.push({source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' }})
		})

		this.props.navigation.navigate('GalleryContainer', {
			navigation: this.props.navigation,
			imagesArr: images_arr,
			PageTitle: data.title,
		})
	}

	preRender() {
		const params = this.props.navigation.state.params
		const {data, videoToggler} = this.state

		if(!data) {
			return (
				<View>
					<Preloader />
				</View>
			)
		}

		return (
			<View>

				<View style={videoToggler ? styles.imageWrapperON : styles.imageWrapper}>

					<View style={styles.imageButtons}>
						{data.video_id &&
						<Button small light
							style={styles.imageButtonsBtn}
							onPress={() => this.imageVideoToggler(true)}>
							<Text>Play video</Text>
						</Button>}
						<Button small light
							style={styles.imageButtonsBtn}
							onPress={() => this.imageVideoToggler(false)}>
							<Text>Photos</Text>
						</Button>
					</View>

					{videoToggler && data.video_id ?
						<View style={styles.imageTouch}>
							<YoutubePlayer id={data.video_id} />
						</View>
						:
						<TouchableOpacity
							style={styles.imageTouch}
							onPress={this.openGallery}>

							<Image
							 style={styles.image}
							 source={{ uri: 'http://i.imgur.com/XP2BE7q.jpg' }} />

						</TouchableOpacity>}


				</View>

				<View padder style={styles.categoryWrapper}>
					{data.categories.map((item, index) => {
						return (
							<View key={index}>
								<Button rounded bordered info small style={styles.categoryBtn}>
									<Text>{item.name}</Text>
								</Button>
							</View>
						)
					})}
				</View>


				<View padder>
					<Text style={tags.h3}>{data.title}</Text>
					<View style={styles.subtitle}>
						<View style={styles.subtitleLocation}>
							<Icon name="place" style={tags.icon} />
							<Text>{data.location.city}</Text>
						</View>

						<View style={styles.subtitlePrice}>
							<Text style={customTags.price}>
								From {data.bestprice.price} €
							</Text>
						</View>
					</View>

					<ReadMore text={data.description_plain} />


				</View>

				<View padder>
					<Text style={tags.h3}>Tickets</Text>
				</View>
				<Tickets navigation={this.props.navigation} data={data.prices} ticketTitle={data.title} />



				<View padder>
					<Text style={tags.h3}>Reviews</Text>
					<View style={{
						marginTop: 30,
					}}>
						<ReviewsBlock data={data.reviews.data} />
					</View>
				</View>


			</View>
		)
	}

	render() {
		const {data} = this.state
		let PageTitle = data ? data.title : 'Details'

		return <Details navigation={this.props.navigation} detailsBlock={this.preRender()} PageTitle={PageTitle} />;
	}
}
