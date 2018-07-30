import React from 'react';

import CardList from './CardList'

export default class CardBox extends React.Component {
    render() {
        console.log(this.props)
        return (
            <ul className="card-box">
                <input className="card-search" value={this.props.cardSearchString} onChange={this.props.handleCardSearchChange}/>
                <CardList cards={this.props.cards}/>
            </ul>
          );
    }
}