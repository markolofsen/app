import * as React from "react";
import { View } from "native-base";

import Wrapper from '../../../components/Wrapper/';


import styles from "./styles";
export interface Props {
	navigation: any;
}
export interface State {}
class Catalog extends React.Component<Props, State> {
	render() {
		// const param = this.props.navigation.state.params;
		return (
			<Wrapper
				name="Catalog"
				{...this.props}
				>

				<View>
					{this.props.catalogList}
				</View>

			</Wrapper>
		);
	}
}

export default Catalog;
