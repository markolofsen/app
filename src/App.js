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


import { translate } from 'react-i18next';
import i18n from './i18n';



const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const Stack = StackNavigator(
	{
		Login: { screen: Login },
		NewOrder: { screen: NewOrder },
		MapLocation: { screen: MapLocation },
		BlankPage: { screen: BlankPage },
		Drawer: { screen: Drawer },
	},
	{
		initialRouteName: "NewOrder",
		headerMode: "none",
	}
);

// The entry point using a react navigation stack navigation
// gets wrapped by the I18nextProvider enabling using translations
// https://github.com/i18next/react-i18next#i18nextprovider
class App extends React.Component {
  render() {
		const { t } = this.props

    return (
				<Root>
					<Stack screenProps={{ t }}/>
				</Root>
		)
  }
}
export default translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false
})(App);
