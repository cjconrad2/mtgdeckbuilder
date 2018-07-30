import React from 'react'

import DeckActions from '../actions/DeckActions'

import Deck from './Deck'

export default class DeckMat extends React.Component {
    render() {
        return (
            <div className='deck-mat'>
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
}