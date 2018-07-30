import React from 'react';

import CardActions from '../actions/CardActions';
import SetActions from '../actions/SetActions';
import MagicApi from '../Api/MagicApi';

import CardBox from './CardBox'
import Sets from './Sets'

export default class Menu extends React.Component {
    render() {
        return (
            <span className="menu">
                <button className="get-cards" onClick={this.getCards}>Get Cards</button>
                <button className="get-sets" onClick={this.getSets}>Get Sets</button>
                <Sets sets={this.props.sets} selectedSet={this.props.selectedSet} handleSelectSet={this.handleSelectSet}/>
                <CardBox cards={this.props.cards} cardSearchString={this.props.cardSearchString} handleCardSearchChange={this.handleCardSearchChange}/>
            </span>
        );
    }

    getCards = () => {
        console.log('in getCards')
        MagicApi.getCards(this.props.selectedSet.code);
    }
    getSets = () => {
        console.log('in getSets')
        MagicApi.getSets();
    }
    handleSelectSet = (event) => {
        SetActions.selectSet(event.target.value);
    }
    handleCardSearchChange = (event) => {
        CardActions.searchCards(event.target.value)
    }
}