import * as React from "react";


import {
	Text,
	View,
	Card,
	CardItem,
	Thumbnail,
	Button,
	Icon,
	Left,
	Body,
	Right
} from 'native-base';
import {
	TouchableOpacity,
	Image
} from 'react-native';


import NumberFormat from '../../components/NumberFormat/'
import RatingBar from '../../components/RatingBar/';
import CountPostfix from '../../components/CountPostfix/';
import Preloader from '../../components/Preloader/'

import {tags, customTags} from '../../theme/__'
import {handleClick} from '../../utils/api'
import styles from "./styles";

class ItemView extends React.Component {
  render() {
    const {data} = this.props

    return (
			<View>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('DetailsContainer', {
						navigation: this.props.navigation,
						slug: data.slug
					})} >
		      <Card style={styles.Card}>
		        <CardItem>
		          <Left>
		            <Thumbnail source={{uri: data.preview}} />
		            <Body>
		              <Text>{data.title}</Text>
		              <Text note>{data.locations[0]}</Text>
		            </Body>
		          </Left>
		        </CardItem>

		        <CardItem cardBody>
		          <Image source={{uri: `${data.preview}`}} style={{height: 200, width: null, flex: 1}}/>
		        </CardItem>
		        <CardItem>
		          <Left>
		            <Button transparent>
		              <Icon active name="thumb-up" />
		              <CountPostfix type='reviews' number={data.reviews} />
		            </Button>

								<RatingBar small rating={data.rating} />
		          </Left>

		          <Right style={{flexWrap: 'nowrap'}}>
								<NumberFormat
									cssClass={customTags.price}
									value={data.bestprice}
									prefix='From' postfix='€' />
		          </Right>
		        </CardItem>
		      </Card>
				</TouchableOpacity>
			</View>
    );
  }
}

export default ItemView;
