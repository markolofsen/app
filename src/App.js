// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";

import NewOrder from "./container/NewOrderContainer";
import MapLocation from "./container/MapLocationContainer";

import NotificationsScreen from './stories/screens/NotificationsScreen/'

import CatalogContainer from './container2/CatalogContainer/'
import DetailsContainer from './container2/DetailsContainer/'
import DetailsTicket from './stories/tbook/DetailsTicket/'

import GalleryContainer from './stories/tbook/Gallery/'


import { translate } from 'react-i18next';
import i18n from './i18n';


const Drawer = DrawerNavigator(
	{
		// Home: { screen: Home },
		CatalogContainer: { screen: CatalogContainer },
	},
	{
		initialRouteName: "CatalogContainer",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const Stack = StackNavigator(
	{
		Login: { screen: Login },
		NewOrder: { screen: NewOrder },
		MapLocation: { screen: MapLocation },
		BlankPage: { screen: BlankPage },
		DrawerOpen: { screen: Drawer },
		NotificationsScreen: { screen: NotificationsScreen },

		CatalogContainer: { screen: CatalogContainer },
		DetailsContainer: { screen: DetailsContainer },
		DetailsTicket: { screen: DetailsTicket },
		GalleryContainer: { screen: GalleryContainer },

	},
	{
		initialRouteName: "CatalogContainer",
		headerMode: "none",
	}
);

// The entry point using a react navigation stack navigation
// gets wrapped by the I18nextProvider enabling using translations
// https://github.com/i18next/react-i18next#i18nextprovider
class App extends React.Component<Props> {

  render() {
		const { t } = this.props

    return (
				<Root>
					<Stack screenProps={{ t }} />
				</Root>
		)
  }
}
export default translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false
})(App);
