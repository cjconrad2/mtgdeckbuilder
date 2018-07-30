import CardActions from '../actions/CardActions';
import uuid from 'uuid';

export default class CardStore {
    constructor() {
      this.bindActions(CardActions);
  
      this.cards = [];
      this.filteredCards = [];
      this.cardSearchString = '';
      this.selectedCards = [];
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

    selectCard(cardId, uId) {
        const selectedCard = this.cards.filter(card => card.cardInfo.id === cardId)[0];
        // Create a new uId for the matching card in the card list since the old id is in use
        const newCards = this.cards.map(card => {
            if(card.cardInfo.id === cardId) {
                const newUId = uuid.v4();
                return Object.assign({}, card.card, {uId: newUId, card: card.cardInfo});
            }
            return card
        });
        this.setState({
            selectedCards: this.selectedCards.concat(selectedCard),
            cards: newCards,
            filteredCards: newCards.filter(card => card.card.name.includes(this.cardSearchString))
        });
    }

    deselectCard(uId) {
        this.setState({
            selectedCards: this.selectedCards.filter(card => card.uId !== uId)
        })
    }
  }