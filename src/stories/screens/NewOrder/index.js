import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, View } from "native-base";

import styles from "./styles";
export interface Props {
	navigation: any;
}
export interface State {}
class BlankPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="chevron-left" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title>{param ? param.name.item : "New order"}</Title>
					</Body>

					<Right />
				</Header>



				<Content>
					{this.props.orderForm}

					<View padder>
						<Button primary block onPress={() => {}}>
							<Text>Done!</Text>
						</Button>
					</View>

				</Content>
			</Container>
		);
	}
}

export default BlankPage;
