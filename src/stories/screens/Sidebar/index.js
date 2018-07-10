import * as React from "react";
import { View, Text, Container, List, ListItem, Content } from "native-base";
import { NavigationActions } from "react-navigation";

import { observer, inject } from "mobx-react/native";

// const _ = require('lodash');

const routes = [
	{
		route: "Home",
		caption: "Home",
	},
	{
		route: "NewOrder",
		caption: "Get taxi",
	},
	{
		route: "BlankPage",
		caption: "Blank Page",
	},
	{
		route: "Login",
		caption: "Logout",
	},
];

export interface Props {
	navigation: any,
}
export interface State {}

function resetAction(slug) {
		return NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({
				routeName: "CatalogContainer",
				// navigation: this.props.navigation,
				params: { slug }
			})],
		})
}

@inject('mainStore')
@observer
export default class Sidebar extends React.Component<Props, State> {


	render() {

		const catalogMenu = this.props.mainStore.settings.menu[0].submenu.map(c => c)

		if(!catalogMenu) {
			return <View />
		}

		return (
			<Container>
				<Content>
					<List
						style={{ marginTop: 40 }}
						dataArray={catalogMenu}
						renderRow={data => {
							return (
								<ListItem
									button
									onPress={() => this.props.navigation.dispatch(resetAction(data.slug)) } >
									<Text>{data.label}</Text>
								</ListItem>
							)
						}} />

					<List
						style={{ marginTop: 40 }}
						dataArray={routes}
						renderRow={data => {
							return (
								<ListItem
									button
									onPress={() => {
										data.route === "Login"
											? this.props.navigation.dispatch(resetAction)
											: this.props.navigation.navigate(data.route);
									}} >
									<Text>{data.caption}</Text>
								</ListItem>
							)
						}} />
				</Content>
			</Container>
		);
	}
}
