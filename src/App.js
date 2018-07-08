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


const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = StackNavigator(
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

export default () => (
	<Root>
		<App />
	</Root>
);