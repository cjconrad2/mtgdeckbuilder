import React from 'react';

import Card from './Card'

export default class CardBox extends React.Component {
    render() {
        console.log(this.props)
        return (
            <ul className="card-box">
                <input className="card-search" value={this.props.cardSearchString} onChange={this.props.handleCardSearchChange}/>
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