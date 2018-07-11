import * as React from "react";


import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, View } from "native-base";
import FooterMenu from '../../../components/Wrapper/FooterMenu/';

import styles from "./styles";
export interface Props {
	navigation: any;
}
export interface State {}
class Catalog extends React.Component<Props, State> {
	render() {
		// const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="chevron-left" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title>{this.props.PageTitle}</Title>
					</Body>

					<Right />
				</Header>

				{this.props.catalogList}

				<FooterMenu />

			</Container>
		);
	}
}

export default Catalog;
