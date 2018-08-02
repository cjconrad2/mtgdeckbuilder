import uuid from 'uuid';

import CardActions from '../actions/CardActions';
import MagicApi from '../Api/MagicApi'

export default class CardStore {
    constructor() {
      this.bindActions(CardActions);
  
      this.cards = [];
      this.filteredCards = [];
      this.cardSearchString = '';
      this.selectedCards = [];
      this.sets = [];
      this.selectedSet = {code: 'UND', name: 'Choose Set'}
      MagicApi.getSets();
    }
  
    receiveCards(responseBody) {
        const cards = responseBody.cards.map(card => {return {uId: undefined, cardInfo: card}})
        this.setState({
            cards: cards,
            filteredCards: cards.filter(card => card.cardInfo.name.includes(this.cardSearchString))
        });
    }

    searchCards(searchString) {
        this.setState({
            filteredCards: this.cards.filter(card => card.cardInfo.name.toLowerCase().includes(searchString.toLowerCase())),
            cardSearchString: searchString
        });
    }

    receiveCardSets(responseBody) {
        this.setState({
            sets: responseBody.sets
        });
    }

    selectCardSet(code) {
        this.setState({
            selectedSet: this.sets.filter(set => set.code === code)[0]
        })
        MagicApi.getCards(this.selectedSet.code);
    }
  }