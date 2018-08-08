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
      this.types = [];
      this.subtypes = [];
      MagicApi.getSets();
      MagicApi.getTypes();
      MagicApi.getSubtypes();
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

    selectCardSet(selectedSet) {
        this.setState({
            selectedSet: this.sets.filter(set => set.code === selectedSet.code)[0]
        });
        this.fireMagicApiGetCards()
    }

    receiveTypes(responseBody) {
        this.setState({
            types: responseBody.types
        });
    }

    selectCardType(selectedType) {
        this.setState({
            selectedType: selectedType
        });
        this.fireMagicApiGetCards()
    }

    receiveSubtypes(responseBody) {
        this.setState({
            subtypes: responseBody.subtypes
        });
    }

    selectCardSubtype(selectedSubtype) {
        this.setState({
            selectedSubtype: selectedSubtype
        });
        this.fireMagicApiGetCards()
    }

    fireMagicApiGetCards() {
        const setCode = this.selectedSet ? this.selectedSet.code : undefined;
        const type = this.selectedType ? this.selectedType : undefined;
        const subtype = this.selectedSubtype ? this.selectedSubtype : undefined
        MagicApi.getCards({setCode, type, subtype});
    }
  }