// @flow
import * as React from "react";
import Catalog from "../../stories/tbook/Catalog/";



// const _ = require('lodash');
import {get} from '../../utils/api'




import {
  Image,
  ListView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';

import {
  Text,
  View,
} from 'native-base';



import { translate } from 'react-i18next';
import styles from "./styles";



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
    };
  }

  _fetchData(callback) {
    const params = this.state._dataPage !== ''
      ? `page=${this.state._dataPage}`
      : '';
    // console.log(this.props.i18n.language)
    //Limits fetches to 15 so there's lesser items from the get go
    get(`/api/catalog/tickets/list/water-sports/?${params}&lang=${this.props.i18n.language}`)
    .then(res => res.results)
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

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => {
            return (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DetailsContainer', {
                  navigation: this.props.navigation,
                  slug: rowData.slug
                })} >

                <View style={styles.listItem}>
                  <View style={styles.imageWrapper}>
                     <Image
                      style={styles.image}
                      source={{ uri: 'https://paragliding4.me/images/pic/paraplan-na-vzlete-advance_1024.jpg' }} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                      {rowData.title}
                    </Text>

                    <Text style={styles.subtitle}>
                      {rowData.description_short}
                    </Text>
                    <Text>{rowData.locations[0]}</Text>
                    <Text>{rowData.bestprice}</Text>
                  </View>
                </View>
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
      );
    }
  }

  render() {
    return <Catalog navigation={this.props.navigation} catalogList={this.preRender()} />
  }
}
