import React from 'react';

import Card from './Card'

export default class CardBox extends React.Component {
    render() {
        console.log(this.props)
        return (
            <ul className="card-box">{this.props.cards.map(({id, name}) =>
                <li key={id}>
                    <Card
                        name={name}
                        id={id} />
                </li>
              )}</ul>
          );
    }
}