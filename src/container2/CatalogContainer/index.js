// @flow
import * as React from "react";
import Catalog from "../../stories/tbook/Catalog/";

// const _ = require('lodash');
import {get} from '../../utils/api'


import {Image, ListView, ActivityIndicator, TouchableOpacity} from 'react-native';

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

import RatingBar from '../../components/RatingBar/';
import CountPostfix from '../../components/CountPostfix/';

import {translate} from 'react-i18next';

import __, {tags, customTags} from '../../theme/__'
import styles from "./styles";




class ItemView extends React.Component {
  render() {
    const {data} = this.props

    return (
      <Card>
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




export interface Props {
	navigation: any,
}
export interface State {}

@translate(['home', 'common'], { wait: true })
export default class CatalogPageContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.fetchMore = this._fetchMore.bind(this);
    this.fetchData = this._fetchData.bind(this);
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataPage: '',

      meta: false,
    };
  }

  _fetchData(callback) {
    const nav = this.props.navigation.state.params

    const params = this.state._dataPage !== ''
      ? `page=${this.state._dataPage}`
      : '';

    const folder = nav ? nav.slug : 'all'
    // console.log(this.props.i18n.language)
    //Limits fetches to 15 so there's lesser items from the get go
    get(`/api/catalog/tickets/list/${folder}/?${params}&lang=${this.props.i18n.language}`)
    .then(res => {
      this.setState({meta: res.meta})
      return res.results

    })
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }

  _fetchMore() {

    return true

    this.fetchData(res => {
      const data = this.state._data.concat(res);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoadingMore: false,
        _data: data,
        _dataPage: 1,
      });
    });
  }

  componentDidMount() {
    //Start getting the first batch of data from reddit
    this.fetchData(res => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      const data = res;
      this.setState({
        dataSource: ds.cloneWithRows(data),
        isLoading: false,
        _data: data,
        _dataPage: 1,
      });
    });
  }

  preRender() {

    const params = this.props.navigation.state.params

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View>
          <View padder>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={rowData => {
                return (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('DetailsContainer', {
                      navigation: this.props.navigation,
                      slug: rowData.slug
                    })} >

                    <ItemView data={rowData} />

                  </TouchableOpacity>
                );
              }}
              onEndReached={() =>
                this.setState({ isLoadingMore: true }, () => this.fetchMore())}
              renderFooter={() => {
                return (
                  this.state.isLoadingMore &&
                  <View style={{ flex: 1, padding: 10 }}>
                    <ActivityIndicator size="small" />
                  </View>
                );
              }}
            />
          </View>
        </View>
      );
    }
  }

  render() {
    const {meta} = this.state
    let PageTitle = meta ? meta.title : 'Catalog'
    return <Catalog navigation={this.props.navigation} catalogList={this.preRender()} PageTitle={PageTitle} />
  }
}
