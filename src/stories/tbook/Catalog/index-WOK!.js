import React, { Component } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'; // 0.18.5
import Footer from './Footer';
import '@expo/vector-icons'; // 6.2.2

import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body, View } from "native-base";


import ItemView from './ItemView'
import Wrapper from '../../../components/Wrapper/';

// import Catalog from "../../stories/tbook/Catalog/";

const _ = require('lodash')
import {translate} from 'react-i18next';
import {get} from '../../../utils/api'



export interface Props {
	navigation: any;
}
export interface State {}

@translate(['home', 'common'], { wait: true })
class App extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

	componentDidMount() {
		// this.makeRemoteRequest();
  }

	// shouldComponentUpdate(nextProps, nextState) {
	// 	let d = _.filter(nextProps, item => {
	// 				if(!item.navigation) return item
	// 			})
	// 	console.log('--------')
	// 	console.log(d)
	// 	return true
	//
	// }


	makeRemoteRequest = () => {
    const { page, seed } = this.state;

    this.setState({ loading: true });

		console.log('LOAD '+page)

    const nav = this.props.navigation.state.params
    const folder = nav ? nav.slug : 'all'
    const postfix = `?page=${page}&lang=${this.props.i18n.language}&seed=${seed}`
    get(`/api/catalog/tickets/list/${folder}/?${postfix}`)
    .then(res => {
      // console.log(res.results)
      //
      this.setState({
        data: page === 1 ? res.results : [...this.state.data, ...res.results],
        error: res.error || null,
        loading: false,
        refreshing: false,
      });
    })
    .catch(error => {
      this.setState({ error, loading: false });
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true,
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  render() {
    return (
			<Container>
				<Header>
					<Left>
						<Button transparent>
							<Icon
								active
								name="menu"
								onPress={() => this.props.navigation.navigate("DrawerOpen")}
							/>
						</Button>
					</Left>


					<Body style={{ flex: 3 }}>
						<Title>OK</Title>
					</Body>

					<Right />
				</Header>


				<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
					<FlatList
						data={this.state.data}
						renderItem={({ item }) => (
							<ItemView data={item} />
						)}
						ListFooterComponent={
							<Footer hasMore={true} isLoading={this.state.loading} />
						}
						keyExtractor={item => item.id}
						ItemSeparatorComponent={this.renderSeparator}
						ListHeaderComponent={this.renderHeader}
						onRefresh={this.handleRefresh}
						refreshing={this.state.refreshing}
						onEndReached={this.handleLoadMore}
						onEndReachedThreshold={0.1}
					/>
				</List>


			</Container>

    );
	}

}

export default App;
