import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, View, Text} from 'native-base';

import styles from './styles'

class ReadMore extends Component {
	state = {
		open: false,
	}

	toggleMode = () => {
		this.setState({open: !this.state.open})
	}

	render() {

		const {open} = this.state
		const {text} = this.props

		if(text.length < 100) {
			return <Text>{text}</Text>
		}

		return (
			<View>

				<View style={open ? styles.viewOpen : styles.viewClosed}>
        	<Text>{text}</Text>
				</View>

				<Button rounded info small onPress={this.toggleMode} style={styles.button}>
						<Text>{open ? 'Close' : 'Read more'}</Text>
				</Button>
      </View>
		)
	}
}
ReadMore.propTypes = {
	text: PropTypes.string.isRequired
};

export default ReadMore
