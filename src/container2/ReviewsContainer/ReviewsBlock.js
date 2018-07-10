import * as React from "react";
import PropTypes from 'prop-types';

// import {
//   View,
//   Text,
//   List,
//   ListItem,
//   Left,
//   Right,
//   Icon
// } from "native-base";
import { View, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('en-es');

import RatingBar from '../../components/RatingBar/';


import styles from "./styles";

class ReviewsBlock extends React.Component {
  render() {

    const {data} = this.props

		if(!data) {
			return <View />
		}

    return (




      <List>
				{data.map((item, index) => {
					return (
						<View avatar key={index} style={{
							width: '100%',
							paddingBottom: 20,
						}}>

							<Text>{item.title}</Text>
							<Text note>
								{item.username} {item.location && `, ${item.location}`}
							</Text>

							<View style={{
								width: '100%',
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}>
								<View style={{
									flex: 3,
									flexDirection: 'row',
									alignItems: 'center',
								}}>
									{item.rating_date && <TimeAgo time={moment(item.rating_date,"YYYY-MM-DD HH:mm:ss")} />}
									{item.rating && <RatingBar rating={item.rating} small />}
								</View>

								{item.avatar &&
									<View style={{
										marginLeft: 10,
									}}>
										<Thumbnail source={{ uri: item.avatar }} />
									</View>}
							</View>

							<Text style={{
								fontSize: 12,
								// marginTop: 10,
							}}>{item.text}</Text>
		        </View>
					)
				})}

      </List>
    );
  }
}


ReviewsBlock.propTypes = {
	data: PropTypes.array.isRequired
};

export default ReviewsBlock;
