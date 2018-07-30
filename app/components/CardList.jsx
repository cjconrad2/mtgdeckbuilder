import React from 'react';

import Card from './Card'

export default class CardList extends React.Component {
    render() {
        console.log(this.props)
        return (
            <ul className="card-list">
                {this.props.cards.map(({id, name, imageUrl}) =>
                    <li key={id}>
                        <Card
                            name={name}
                             id={id}
                            imageUrl={imageUrl} />
                    </li>
                )}
            </ul>
          );
    }
}