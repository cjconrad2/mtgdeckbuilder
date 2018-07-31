import React from 'react'
import uuid from 'uuid'

import DeckActions from '../actions/DeckActions'

import Deck from './Deck'

export default class DeckMat extends React.Component {
    render() {
        return (
            <div className='deck-mat'>
                <div className='deck-mat-buttons'>
                    <button className="add-deck" onClick={this.addDeck}>New Deck</button>
                </div>
                {this.props.decks.map(deck =>
                    <Deck 
                        className="deck"
                        onMove={DeckActions.moveDeck} 
                        key={deck.id} 
                        deck={deck} />
                )}
            </div>
        );
    }
    addDeck = () => {
        const id = uuid.v4();
        DeckActions.create({
            id: id,
             key: id,
            name: '',
            editing: true
        });
    }
}