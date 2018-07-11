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
import {Image} from 'react-native';


import RatingBar from '../../../components/RatingBar/';
import CountPostfix from '../../../components/CountPostfix/';
import Preloader from '../../../components/Preloader/'

import {tags, customTags} from '../../../theme/__'
import styles from "./styles";

class ItemView extends React.Component {
  render() {
    const {data} = this.props

    return (
      <Card style={styles.Card}>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: 'http://i.imgur.com/XP2BE7q.jpg'}} />
            <Body>
              <Text>{data.title}</Text>
              <Text note>{data.locations[0]}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: 'http://i.imgur.com/XP2BE7q.jpg'}} style={{height: 200, width: null, flex: 1}}/>
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
            <Text style={customTags.price}>
							From {data.bestprice} €
						</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

export default ItemView;
