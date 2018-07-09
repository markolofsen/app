import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from "native-base";

import styles from "./styles";
export interface Props {
	navigation: any,
	onApply: Function,
}
export interface State {}
class BlankPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		// const TEST = this.props.navigation.props.TEST
		// console.log(this.props.navigation)
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="chevron-left" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title>{param.PageTitle}</Title>
					</Body>

					<Right>
						<Button transparent onPress={() => {this.props.onApply()}}>
							<Icon name="refresh" />
						</Button>
					</Right>
				</Header>

				<Content padder>
					{this.props.orderForm}

					<Button
	          block primary
	          onPress={() => { this.props.getAddress(), this.props.navigation.goBack() }}
	          style={{ marginBottom: 10 }}>
	          <Text>
	            Done!
	          </Text>
	        </Button>

				</Content>

			</Container>
		);
	}
}

export default BlankPage;
