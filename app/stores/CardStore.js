import CardActions from '../actions/CardActions';

export default class CardStore {
    constructor() {
      this.bindActions(CardActions);
  
      this.cards = [];
      this.filteredCards = [];
      this.cardSearchString = '';
    }
  
    receiveCards(responseBody) {
        console.log('in recieve cards')
        this.setState({
            cards: responseBody.cards,
            filteredCards: responseBody.cards.filter(card => card.name.includes(this.cardSearchString))
        });
        console.log(this.cards)
    }

    searchCards(searchString) {
        this.setState({
            filteredCards: this.cards.filter(card => card.name.toLowerCase().includes(searchString.toLowerCase())),
            cardSearchString: searchString
        });
    }
  }