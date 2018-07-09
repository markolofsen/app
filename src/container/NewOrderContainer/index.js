// @flow
import React, {Component} from "react";
import NewOrder from "../../stories/screens/NewOrder";


import { Item, Input, Icon, Button, Form, View, Text} from "native-base";

// import InputEmulator from '../../../components/Form/InputEmulator';

import DateTimePicker from './DateTimePicker/';

import { translate } from 'react-i18next';

import styles from "./styles";




export interface Props {
	navigation: any,
}
export interface State {}

@translate(['home', 'common'], { wait: true })
class NewOrderContainer extends React.Component<Props, State> {

	// static navigationOptions = ({ navigation, screenProps }) => ({
  //   title: screenProps.t('home:title')
  // });


	state = {
		comment: ''
	}

	commentHandle = (comment) => {
		this.setState({comment})
	}


	render() {
		const { t, i18n } = this.props;

		const Fields = (
			<Form>

				<Text>{t('common:currentLanguage', { lng: i18n.language })}</Text>

				<Item error={false}>
					<Icon active name="place" />
					<Button transparent
	          onPress={() => this.props.navigation.navigate('MapLocation', {...this.props.param, PageTitle: 'From'})}>
	          <Text style={styles.textInput}>From</Text>
	        </Button>
				</Item>

				<Item error={false}>
					<Icon active name="place" />
					<Button transparent
	          onPress={() => this.props.navigation.navigate('MapLocation', {...this.props.param, PageTitle: 'To'})}>
	          <Text style={styles.textInput}>To</Text>
	        </Button>
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
export default NewOrderContainer;
