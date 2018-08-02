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
        console.log('in recieve cards')
        const cards = responseBody.cards.map(card => {
            const uId = uuid.v4();
            return {uId: uId, cardInfo: card}
        });
        this.setState({
            cards: cards,
            filteredCards: cards.filter(card => card.cardInfo.name.includes(this.cardSearchString))
        });
        console.log(this.cards)
    }

    searchCards(searchString) {
        this.setState({
            filteredCards: this.cards.filter(card => card.cardInfo.name.toLowerCase().includes(searchString.toLowerCase())),
            cardSearchString: searchString
        });
    }

    receiveCardSets(responseBody) {
        console.log('in recieve sets')
        this.setState({
            sets: responseBody.sets
        });
        console.log(this.sets)
    }

    selectCardSet(code) {
        this.setState({
            selectedSet: this.sets.filter(set => set.code === code)[0]
        })
        MagicApi.getCards(this.selectedSet.code);
    }
  }