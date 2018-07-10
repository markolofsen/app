import { observable, action } from "mobx";

import {get} from '../../utils/api'


class HomeStore {
  @observable hasErrored = false;
  @observable isLoading = true;
  @observable settings = false;

  @action
  fetchItems(data) {
    this.items = data;
    this.isLoading = false;
  }

  constructor() {
    get('/api/system/settings/').then(res => {
      this.settings = res.results
    })
  }
}

export default HomeStore;
