import React, {Component} from 'react';

import { View, Text, Container, Spinner } from 'native-base';

import __ from '../../theme/__'

class CountPostfix extends Component {

	render() {

		return (
			<View style={{
				flex: 1,
				height: __.deviceHeightInner,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				}}>
				<Spinner color={__.brandPrimary} />
			</View>
		)
	}
}

export default CountPostfix
