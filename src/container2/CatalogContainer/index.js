import React, { Component } from 'react';
import { Button } from 'native-base';
import { FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'; // 0.18.5
import Footer from './Footer';
import '@expo/vector-icons'; // 6.2.2

import ItemView from './ItemView'
import {get} from '../../utils/api'


import {  AsyncStorage, View, Text } from 'react-native';
import {translate} from 'react-i18next';
import { observer, inject } from "mobx-react/native";


import Catalog from "../../stories/tbook/Catalog/";
import styles from "./styles";

const _ = require('lodash')

export interface Props {
	navigation: any,
}
export interface State {}


@inject("mainStore")
@observer
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

			_pagesTotal: false,
			_meta: false
    };

		this.makeRemoteRequest = _.debounce(this._makeRemoteRequest.bind(this), 500);

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

		// AsyncStorage.getItem('aItem', (error, result) => {
		// 	console.warn('callback', result);
		// 	this.setState({ callback: result });
		// })
		// .then(result => {
		// 	console.warn('promise', result);
		// 	this.setState({ promise: result });
		// });
  }

	// makeRemoteRequest = () => {
	// 	const { page, seed } = this.state;
	// 	const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
	// 	this.setState({ loading: true });
	//
	// 	console.log('————————————'+page)
	//
	//
	// 	fetch(url)
	// 		.then(res => res.json())
	// 		.then(res => {
	// 			this.setState({
	// 				data: page === 1 ? res.results : [...this.state.data, ...res.results],
	// 				error: res.error || null,
	// 				loading: false,
	// 				refreshing: false,
	// 			});
	// 		})
	// 		.catch(error => {
	// 			this.setState({ error, loading: false });
	// 		});
	// };
	//
	shouldComponentUpdate(nextProps, nextState) {
		const nextParams = nextProps.navigation.state.params
		const params = this.props.navigation.state.params

		if(typeof nextParams !== 'undefined' && typeof params !== 'undefined') {
			if(nextParams.slug != params.slug) {
				// alert(nextParams.slug)
				this.setState({data: []}, () => this.handleRefresh())
				// this.scroller.scrollTo({x: 0, y: 0});
			}
		}

		// if(this.state.isLoadingMore && nextState.isLoadingMore) {
		// 	console.log('----> UPDATE')
		// 	return false
		// }
		// if(!params && this.state.dataSource != null) {
		// 	// this.setState({isLoading: true}, () => this.firstLoad())
		// }

		return true
	}

  _makeRemoteRequest = () => {
    const { page, seed } = this.state;

    this.setState({ loading: true });



    const nav = this.props.navigation.state.params
    const folder = nav ? nav.slug : 'all'
    const url = `/api/catalog/tickets/list/${folder}/?page=${page}&lang=${this.props.i18n.language}&seed=${seed}`

		console.log('————————————'+page)
		console.log(url)

		const {_pagesTotal} = this.state

		console.log('_pagesTotal '+_pagesTotal)
		console.log('page '+page)
		if(_pagesTotal == false || page <= _pagesTotal) {
	    get(url).then(res => {
	      this.setState({
	        data: page === 1 ? res.results : [...this.state.data, ...res.results],
	        error: res.error || null,
	        loading: false,
	        refreshing: false,

					_pagesTotal: res.page.pages,
					_meta: res.meta,
	      }, () => {});
				// console.log(res.meta)
	    })
	    .catch(error => {
	      this.setState({ error, loading: false });
	    });
		} else {
			this.setState({
				loading: false,
				refreshing: false,
			}, () => {})
		}
  };


handleRefresh = () => {
	this.setState({
		page: 1,
		seed: this.state.seed + 1,
		refreshing: true
	}, () => {
		this.makeRemoteRequest();
	});
};

handleLoadMore = () => {
	this.setState({
		page: this.state.page + 1
	}, () => {
		this.makeRemoteRequest();
	});
};

  preRender() {

    return (
			<View style={styles.container}>

	      <List containerStyle={styles.List}>
	        <FlatList
						containerStyle={styles.FlatList}
	          data={this.state.data}
	          renderItem={({ item }) => (
							<ItemView navigation={this.props.navigation} data={item} />
	          )}
	          ListFooterComponent={
	            <Footer isLoading={this.state.loading} />
	          }
	          keyExtractor={item => item.slug}
	          // onRefresh={this.handleRefresh}
	          refreshing={this.state.refreshing}
	          onEndReached={this.handleLoadMore}
	          onEndReachedThreshold={50}
	        />
	      </List>
			</View>
    );
	}


	render() {
		const {_meta} = this.state

		return <Catalog
			navigation={this.props.navigation}
			catalogList={this.preRender()}
			PageTitle={_meta ? _meta.title_original : 'Catalog'}
			infiniteScroll
			noFooter
		 />
	}
}

export default App;
