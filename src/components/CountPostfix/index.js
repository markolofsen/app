import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, View, Text, Icon} from 'native-base';
import { translate } from 'react-i18next';


// import styles from './styles'

@translate(['postfixes'], { wait: true })
class CountPostfix extends Component {

	render() {
		const {t, type, number} = this.props
		let titles = ['no']

		if(type == 'reviews') {
			titles = ['review_one','review_three','review_ten']
		}

		let cases = [2, 0, 1, 1, 1, 2];
	  let title = titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];

		return (
			<Text>{number} {t(title)}</Text>
		)
	}
}
CountPostfix.propTypes = {
	type: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
};

export default CountPostfix
