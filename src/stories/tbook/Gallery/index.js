import * as React from "react";
import { Container, Header, Title, Content, Text, View, Button, Icon, Left, Right, Body } from "native-base";


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
					<View>
						<Gallery
				        style={styles.gallery}
								images={param.imagesArr}
								flatListProps={{
									windowSize: 3
								}}
				      />
					</View>
				</Content>

			</Container>
		);
	}
}

export default GalleryPage;
