import React from 'react';
import uuid from 'uuid';

import MagicCard from './Card'
import DeckActions from '../../actions/DeckActions'

export default class CardList extends React.Component {
    render() {
        //console.log(this.props)
        return (
            <ul className="card-list">
                {this.props.cards.map(card =>
                    <li key={uuid.v4()}>
                        <MagicCard
                            fromMenu={this.props.fromMenu}
                            onMove={DeckActions.moveCard}
                            card={card} />
                    </li>
                )}
            </ul>
          );
    }
}