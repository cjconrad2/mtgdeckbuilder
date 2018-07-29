import SetActions from '../actions/SetActions';
import MagicApi from '../Api/MagicApi'

export default class SetStore {
    constructor() {
      this.bindActions(SetActions);
  
      this.sets = [];
      this.selectedSet = {code: 'UND', name: 'Choose Set'}
      MagicApi.getSets();
    }
  
    receiveSets(responseBody) {
        console.log('in recieve sets')
        this.setState({
            sets: responseBody.sets
        });
        console.log(this.sets)
    }

    selectSet(code) {
        this.setState({
            selectedSet: this.sets.filter(set => set.code === code)[0]
        })
        MagicApi.getCards(this.selectedSet.code);
    }
  }