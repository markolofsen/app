import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, View, Text, Icon} from 'native-base';

import styles from './styles'

class RatingBar extends Component {

	render() {
		const {rating} = this.props

		let iconName = 'star'
		if(rating <= 1) iconName = 'star-border'
		if(rating > 1) iconName = 'star-half'
		if(rating >= 4) iconName = 'star'


		return (
			<View transparent style={styles.buttonRating}>
				<Icon active name={iconName} style={styles.icon} />
        <Text style={styles.text}>{parseFloat(rating).toFixed(1)}</Text>
      </View>
		)
	}
}
RatingBar.propTypes = {
	rating: PropTypes.number.isRequired
};

export default RatingBar
