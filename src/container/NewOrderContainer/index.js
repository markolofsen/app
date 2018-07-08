// @flow
import React, {Component} from "react";
import NewOrder from "../../stories/screens/NewOrder";


import { Item, Input, Icon, Button, Form, View, Text} from "native-base";

import { DatePicker } from 'native-base';



export interface Props {
	navigation: any,
}
export interface State {}
export default class NewOrderContainer extends React.Component<Props, State> {
	render() {

		const Fields = (
			<Form>

				<Item error={false}>
					<Icon active name="person" />
					<Input
						placeholder="From"
						keyboardType="email-address"
						ref={c => (this.emailInput = c)}
						value=""
					/>
				</Item>

				<Item error={false}>
					<Icon active name="person" />
					<Input
						placeholder="When"
						type="time"
						keyboardType="email-address"
						ref={c => (this.dateInput = c)}
						value=""
					/>
				</Item>

				<DatePickerExample />

				<View padder>
					<Button transparent small onPress={() => this.props.navigation.navigate('MapLocation')}>
            <Icon name='place' />
						<Text>From</Text>
          </Button>
				</View>

			</Form>
		)
		return <NewOrder navigation={this.props.navigation} orderForm={Fields} />;
	}
}





class DatePickerExample extends Component {

  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  render() {
    return (
      <View>
          <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={true}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            />
            <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
      </View>
    );
  }
}
