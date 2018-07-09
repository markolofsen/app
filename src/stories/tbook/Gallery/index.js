import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from "native-base";


import { Constants } from 'expo';
import Dimensions from 'Dimensions';

import Gallery from 'react-native-image-gallery';
import styles from "./styles";


export interface Props {
	navigation: any,
	onApply: Function,
}
export interface State {}
class GalleryPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		// const TEST = this.props.navigation.props.TEST
		// console.log(this.props.navigation)

		const {width, height} = Dimensions.get('window');

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

					<Right />
				</Header>

				<Content>
					<Gallery
			        style={{
								flex: 1,
								height: height - Constants.statusBarHeight - 40,
								backgroundColor: 'black'
							 }}
							images={param.imagesArr}
							flatListProps={{
								windowSize: 3
							}}
			      />
				</Content>

			</Container>
		);
	}
}

export default GalleryPage;
