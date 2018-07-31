import React from 'react';

import connect from '../libs/connect';
import DeckActions from '../actions/DeckActions';
import Editable from './Editable';


class DeckHeader extends React.Component {
    render() {
        return (
            <div className="deck-header" onClick={this.activateDeckEdit}>
                <Editable 
                    className="deck-name" 
                    editing={this.props.deck.editing}
                    value={this.props.deck.name} 
                    onEdit={this.editName} />
                <div className="deck-delete">
                    <button onClick={this.deleteDeck}>x</button>
                </div>
            </div>
          );
    }
    activateDeckEdit = () => {
        DeckActions.update({
            id: this.props.deck.id,
            editing: true
        });
    };
    editName = name => {
        console.log('in edit name for deck', this.props.deck.id)
        DeckActions.update({
            id: this.props.deck.id,
            name,
            editing: false
        });
    };
    deleteDeck = e => {
        DeckActions.delete(this.props.deck.id)
    }
}

export default connect(
    () => ({}), {
      DeckActions
    }
)(DeckHeader)