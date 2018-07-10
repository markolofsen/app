import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {View, Text} from 'native-base';

import { WebView } from 'react-native';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-elements'; // Version can be specified in package.json


import styles from './styles'

class YoutubePlayer extends Component {
	render() {
		const {id} = this.props
		
    return (
			<View style={styles.videoContainer}>
				<WebView
					javaScriptEnabled={true}
					source={{uri: `https://www.youtube.com/embed/${id}?rel=0&autoplay=0&showinfo=0&controls=0`}}
				/>
			</View>
    );
  }
}


YoutubePlayer.propTypes = {
	id: PropTypes.string.isRequired
};

export default YoutubePlayer
