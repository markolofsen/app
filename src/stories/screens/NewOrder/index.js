import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, View } from "native-base";


import Wrapper from '../../../components/Wrapper/';

import styles from "./styles";
export interface Props {
	navigation: any;
}
export interface State {}
class NewOrderPage extends React.Component<Props, State> {
	render() {
		// const param = this.props.navigation.state.params;
		return (
			<Wrapper
				name="New order"
				{...this.props}
				>

				<View>
					{this.props.orderForm}

					<View padder>
						<Button primary block onPress={() => {}}>
							<Text>Done!</Text>
						</Button>
					</View>

				</View>

			</Wrapper>
		);
	}
}

export default NewOrderPage;
