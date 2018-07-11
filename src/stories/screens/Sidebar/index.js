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

		const {mainStore} = this.props

		const catalogMenu = this.props.mainStore.settings.menu[0].submenu.map(c => c)

		if(!catalogMenu) {
			return <View />
		}

		// onPress={() => this.props.navigation.dispatch(resetAction(data.slug)) } >

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
									onPress={() => this.props.navigation.navigate('CatalogContainer', {
										slug: data.slug,
									}) } >
									<Text>{data.label}</Text>
								</ListItem>
							)
						}} />

					{true == false &&
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
						}} />}

						<View style={{height: 30}} />


						<ListItem
							button
							onPress={() => mainStore.changeLang('ru')}>
							<Text>Russian {mainStore.userLang == 'ru' && '<<'}</Text>
						</ListItem>

						<ListItem
							button
							onPress={() => mainStore.changeLang('en')}>
							<Text>English {mainStore.userLang == 'en' && '<<'}</Text>
						</ListItem>

				</Content>
			</Container>
		);
	}
}
