import React from 'react';

import Card from './Card'

export default class CardList extends React.Component {
    render() {
        console.log(this.props)
        return (
            <ul className="card-list">
                {this.props.cards.map(({uId, cardInfo}) =>
                    <li key={uId}>
                        <Card
                            name={cardInfo.name}
                            cardId={cardInfo.id}
                            imageUrl={cardInfo.imageUrl} />
                    </li>
                )}
            </ul>
          );
    }
}