import { observable, action } from "mobx";

import {get} from '../../utils/api'

import Expo from 'expo';
import {AsyncStorage} from 'react-native';


class HomeStore {
  @observable hasErrored = false;
  @observable isLoading = true;
  @observable settings = false;

  @observable userLang = 'en'


  @action
  changeLang(lng) {
    this.userLang = lng
    AsyncStorage.setItem('userLang', lng)
  }

  @action
  loadLang(lng) {
    AsyncStorage.getItem('userLang').then(res => {
      if(res) this.userLang = res
    })
  }


  constructor() {

    this.loadLang()

    get('/api/system/settings/').then(res => {
      this.settings = res.results
    })
  }
}

export default HomeStore;
