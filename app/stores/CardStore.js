import CardActions from '../actions/CardActions';

export default class CardStore {
    constructor() {
      this.bindActions(CardActions);
  
      this.cards = [];
    }
  
    receiveCards(responseBody) {
        console.log('in recieve cards')
        this.setState({
            cards: responseBody.cards
        });
        console.log(this.cards)
    }
  }