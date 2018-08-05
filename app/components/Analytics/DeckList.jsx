import React from 'react';

import connect from '../../libs/connect';
import DeckActions from '../../actions/DeckActions'

class DeckList extends React.Component {
    render() {
        return(
            <div className="deck-list-wrapper">
                <select value={this.props.selectedDeck} onChange={this.handleSelectDeck}>
                    {this.props.decks.map(({id, name}) => 
                        <option key={id} value={id}>{name}</option>
                    )}
                </select>
            </div>
        )
    }
    handleSelectDeck = (event) => {
        DeckActions.selectDeck(event.target.value);
    }
}

export default connect(
    ({decks}) => ({decks})
    , {DeckActions})(DeckList)