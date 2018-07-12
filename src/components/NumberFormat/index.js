import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {View, Text} from 'native-base';
import NumberFormat from 'react-number-format';

import styles from './styles'

class NumberBlock extends Component {
	render() {

		const {value, prefix, postfix, cssClass} = this.props

		const prefix_ = prefix ? `${prefix} ` : false
		const postfix_ = postfix ? ` ${postfix}` : ''
		const s = cssClass ? cssClass : ''

		if(typeof value !== 'number') return <View />
		return (
			<View>
				<NumberFormat
					value={value}
					decimalScale={0}
					fixedDecimalScale={true}
					displayType={'text'}
					thousandSeparator={true}
					prefix={prefix_}
					renderText={value => <Text style={{...s}}>{value}{postfix_}</Text>}
					/>
      </View>
		)
	}
}
NumberBlock.propTypes = {
	// value: PropTypes.number.isRequired
};

export default NumberBlock
