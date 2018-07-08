// @flow
import React, {Component} from "react";
import NewOrder from "../../stories/screens/NewOrder";


import { Item, Input, Icon, Button, Form, View, Text} from "native-base";

// import InputEmulator from '../../../components/Form/InputEmulator';

import DateTimePicker from './DateTimePicker/';
import MapPicker from './MapPicker/';


import styles from "./styles";




export interface Props {
	navigation: any,
}
export interface State {}
export default class NewOrderContainer extends React.Component<Props, State> {
	state = {
		comment: ''
	}

	commentHandle = (comment) => {
		this.setState({comment})
	}


	render() {

		const Fields = (
			<Form>


				<Item error={false}>
					<Icon active name="place" />
					<MapPicker {...this.props} />
				</Item>

				<Item error={false}>
					<Icon active name="place" />
					<MapPicker {...this.props} />
				</Item>


				<Item error={false}>
					<Icon active name="date-range" />
					<DateTimePicker />
				</Item>

				<Item error={false}>
					<Input
						placeholder="Comment"
						keyboardType="default"
						ref={c => (this.commentInput = c)}
						value={this.state.comment}
						onBlur={() => {}}
						onChangeText={e => this.commentHandle(e)}
						multiline={true}
						style={styles.comment}
					/>
				</Item>

			</Form>
		)
		return <NewOrder navigation={this.props.navigation} orderForm={Fields} />;
	}
}
