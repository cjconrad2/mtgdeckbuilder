import update from 'react-addons-update';

import DeckActions from '../actions/DeckActions';

export default class DeckStore {
  constructor() {
    this.bindActions(DeckActions);

    this.decks = [];
  }
  create(deck) {
    // If `cardIds` aren't provided for some reason,
    // default to an empty array.
    deck.cardIds = deck.cardIds || [];
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
  attachToDeck({deckId, cardId}) {
    this.setState({
      decks: this.decks.map(deck => {
        if(deck.cardIds.includes(cardId)) {
          deck.cardIds = deck.cardIds.filter(id => id !== cardId);
        }

        if(deck.id === deckId) {
          deck.cardIds = deck.cardIds.concat([cardId]);
        }

        return deck;
      })
    });
  }
  detachFromDeck({deckId, cardId}) {
    this.setState({
      decks: this.decks.map(deck => {
        if(deck.id === deckId) {
          deck.cardIds = deck.cardIds.filter(card => card !== cardId);
        }

        return deck;
      })
    });
  }
  moveCard({sourceId, targetId}) {
    const decks = this.decks;
    const sourceDeck = decks.filter(deck => deck.cardIds.includes(sourceId))[0];
    const targetDeck = decks.filter(deck => deck.cardIds.includes(targetId))[0];
    const sourceCardIndex = sourceDeck.cardIds.indexOf(sourceId);
    const targetCardIndex = targetDeck.cardIds.indexOf(targetId);

    if(sourceDeck === targetDeck) {
      // move at once to avoid complications
      sourceDeck.cardIds = update(sourceDeck.cardIds, {
        $splice: [
          [sourceCardIndex, 1],
          [targetCardIndex, 0, sourceId]
        ]
      });
    }
    else {
      // get rid of the source
      sourceDeck.cardIds.splice(sourceCardIndex, 1);

      // and move it to target
      targetDeck.cardIds.splice(targetCardIndex, 0, sourceId);
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
}