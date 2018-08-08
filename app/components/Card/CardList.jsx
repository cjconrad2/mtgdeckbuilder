import React from 'react';
import uuid from 'uuid';

import MagicCard from './Card'
import DeckActions from '../../actions/DeckActions'

export default class CardList extends React.Component {
    render() {
        //console.log(this.props)
        return (
            <div className="card-list">
                {this.props.cards.map(card =>
                        <MagicCard key={uuid.v4()}
                            fromMenu={this.props.fromMenu}
                            onMove={DeckActions.moveCard}
                            card={card} />
                )}
            </div>
          );
    }
}