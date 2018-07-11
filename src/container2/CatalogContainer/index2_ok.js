import React, { Component } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'; // 0.18.5
import Footer from './Footer';
import '@expo/vector-icons'; // 6.2.2


import {  AsyncStorage, View, Text } from 'react-native';

import Catalog from "../../stories/tbook/Catalog/";

class App extends Component {
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
		this.makeRemoteRequest();


    // AsyncStorage.setItem('aItem', 'Hello world1')
    // .then(() => {
    //   AsyncStorage.getItem('aItem', (error, result) => {
    //     console.warn('callback', result);
    //     this.setState({ callback: result });
    //   })
    //   .then(result => {
    //     console.warn('promise', result);
    //     this.setState({ promise: result });
    //   });
    // })

		AsyncStorage.getItem('aItem', (error, result) => {
			console.warn('callback', result);
			this.setState({ callback: result });
		})
		.then(result => {
			console.warn('promise', result);
			this.setState({ promise: result });
		});
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
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

  preRender() {
    return (
			<View>
        <Text>{this.state.callback || ''}</Text>
        <Text>{this.state.promise || ''}</Text>

	      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
	        <FlatList
	          data={this.state.data}
	          renderItem={({ item }) => (
	            <ListItem
	              roundAvatar
	              title={`${item.name.first} ${item.name.last}`}
	              subtitle={item.email}
	              avatar={{ uri: item.picture.thumbnail }}
	              containerStyle={{ borderBottomWidth: 0 }}
	            />
	          )}
	          ListFooterComponent={
	            <Footer hasMore={true} isLoading={this.state.loading} />
	          }
	          keyExtractor={item => item.email}
	          ItemSeparatorComponent={this.renderSeparator}
	          ListHeaderComponent={this.renderHeader}
	          onRefresh={this.handleRefresh}
	          refreshing={this.state.refreshing}
	          onEndReached={this.handleLoadMore}
	          onEndReachedThreshold={50}
	        />
	      </List>
			</View>
    );
	}

	render() {
		return <Catalog navigation={this.props.navigation} catalogList={this.preRender()} PageTitle={'Cool'} />
	}
}

export default App;
