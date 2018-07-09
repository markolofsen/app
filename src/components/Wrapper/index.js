import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, View } from "native-base";


import FooterMenu from './FooterMenu/';

import styles from "./styles";
export interface Props {
	navigation: any;
}
export interface State {}
class WrapperComponent extends React.Component<Props, State> {
	render() {
		const {name} = this.props
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
						<Title>{param ? param.name.item : name}</Title>
					</Body>

					<Right />
				</Header>


				<Content>
					{this.props.children}
				</Content>

				<FooterMenu />
			</Container>
		);
	}
}

export default WrapperComponent;
