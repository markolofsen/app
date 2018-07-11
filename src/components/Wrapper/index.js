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
		const {routeName} = this.props.navigation.state
		const {infiniteScroll, noFooter} = this.props

		return (

			<Container style={styles.container}>
				<Header>
					<Left>
						{routeName == 'CatalogContainer' ?
							<Button transparent>
	              <Icon
	                active
	                name="menu"
	                onPress={() => this.props.navigation.navigate("DrawerOpen")}
	              />
	            </Button>
						:
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name="chevron-left" />
							</Button>}
					</Left>


					<Body style={{ flex: 3 }}>
						<Title>{this.props.name}</Title>
					</Body>

					<Right />
				</Header>


				{infiniteScroll ?
					<View style={noFooter ? styles.infiniteScrollNoFooter : styles.infiniteScroll}>
						{this.props.children}
					</View>
					:
					<Content>{this.props.children}</Content>
				}


				{!noFooter && true==false && <FooterMenu />}
			</Container>
		);
	}
}

export default WrapperComponent;
