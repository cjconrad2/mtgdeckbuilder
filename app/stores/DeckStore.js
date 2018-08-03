import update from 'react-addons-update';
import uuid from 'uuid';

import DeckActions from '../actions/DeckActions';

export default class DeckStore {
  constructor() {
    this.bindActions(DeckActions);

    this.decks = [];
    this.selectedDeck = ''
  }
  create(deck) {
    // If `cardIds` aren't provided for any reason,
    // default to an empty array.
    deck.cards = deck.cards || [];
    console.log('New deck:', deck)
    this.setState({
      decks: this.decks.concat(deck)
    });
  }
  update(updatedDeck) {
      console.log('in update!', updatedDeck)
    this.setState({
        decks: this.decks.map(deck => {
            if(deck.id === updatedDeck.id) {
                return Object.assign({}, deck, updatedDeck);
            }
  
            return deck;
        })
    });
  }
  delete(deckId) {
      this.setState({
          decks: this.decks.filter(deck => deck.id !== deckId)
      })
  }
  attachToDeck({deckId, card, fromMenu}) {
    console.log('Attaching card to deck', card, deckId, fromMenu)
    if(!fromMenu) {
      this.detachFromDeck({
        deckId: this.decks.filter(deck => deck.cards.map(c => c.uId).includes(card.uId))[0].id,
        cardUId: card.uId
      })
    }
    const uId = uuid.v4()
    this.setState({
      decks: this.decks.map(deck => {
        if(deck.id === deckId) {
          deck.cards = fromMenu ? deck.cards.concat([{uId: uId, cardInfo: card.cardInfo}]) : deck.cards.concat([card]);
        }
        return deck;
      })
    });
  }
  attachToDeckBasedOnCard({targetCardId, card, fromMenu}){
    console.log('in attachToDeckBasedOnCard. targetCardId', targetCardId, 'source card', card)
    const deckCards = this.decks.map(deck => deck.cards)
    console.log('deck cards: ', deckCards)
    const deckId = this.decks.filter(deck => deck.cards.map(c => c.uId).includes(targetCardId))[0].id
    console.log('deckId', deckId)
    this.attachToDeck({deckId, card, fromMenu})
  }
  detachFromDeck({deckId, cardUId}) {
    this.setState({
      decks: this.decks.map(deck => {
        if(deck.id === deckId) {
          deck.cards = deck.cards.filter(card => card.uId !== cardUId);
        }
        return deck;
      })
    });
  }
  moveCard({sourceCardId, targetCardId}) {
    console.log(`source: ${sourceCardId}, target: ${targetCardId}`);
    const decks = this.decks;
    console.log('decks', decks)
    const sourceDeck = decks.filter(deck => deck.cards.map(card => card.uId).includes(sourceCardId))[0];
    console.log('sourcedeck', sourceDeck)
    const targetDeck = decks.filter(deck => deck.cards.map(card => card.uId).includes(targetCardId))[0];
    console.log('targetdeck', targetDeck)
    if(!sourceDeck && !targetDeck) {
      // Moving card within the menu, do nothing
      return;
    }

    const targetCardIndex = targetDeck.cards.map(card => card.uId).indexOf(targetCardId);
    const sourceCardIndex = sourceDeck.cards.map(card => card.uId).indexOf(sourceCardId);
    const sourceCard = sourceDeck.cards[sourceCardIndex]

    if(sourceDeck === targetDeck) {
      // move within the same deck
      sourceDeck.cards = update(sourceDeck.cards, {
        $splice: [
          [sourceCardIndex, 1],
          [targetCardIndex, 0, sourceCard]
        ]
      });
    }
    else {
      console.log('sourceDeck',sourceDeck,'targetDeck',targetDeck)
      //Move from one deck to another
      // get rid of the source
      sourceDeck.cards.splice(sourceCardIndex, 1);

      // and move it to target
      targetDeck.cards.splice(targetCardIndex, 0, sourceCard);
    }

    this.setState({decks});
  }
  moveDeck({sourceId, targetId}){
    var decks = this.decks;
    const sourceDeck = decks.filter(deck => deck.id === sourceId)[0];
    const targetDeck = decks.filter(deck => deck.id === targetId)[0];
    const sourceDeckIndex = decks.indexOf(sourceDeck);
    const targetDeckIndex = decks.indexOf(targetDeck);
    console.log('source deck:', sourceDeck, ' target deck:', targetDeck)

    if(sourceDeck === targetDeck) {
        //DoNothing
    }
    else {
        decks = update(decks, {
            $splice: [
              [sourceDeckIndex, 1],
              [targetDeckIndex, 0, sourceDeck]
            ]
          });
    }
    this.setState({decks})
  }
  selectDeck(deckId) {
    this.setState({
      selectedDeck: deckId
    });
  }
}