import React from 'React';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import connect from '../../libs/connect';
import DeckActions from '../../actions/DeckActions';
import ManaCurveChart from './Charts/ManaCurveChart';

class DeckStats extends React.Component {
    render() {
        const deck = this.props.decks.filter(deck => deck.id === this.props.selectedDeck)[0]
        if(deck) {
            const cardCount = deck.cards.length
            // colors has a bug if the first card is colorless
            const colors = deck.cards.map(card => card.cardInfo.colors)
                .reduce((accumulator, currentValue) => accumulator.concat(currentValue))
                .filter((v,i,a) => a.indexOf(v) === i);
            return(
                <div className="deck-stats">
                    <div className="deck-name">Name: {deck.name}</div><br></br>
                    <div className="deck-card-count">Card Count: {cardCount}</div>
                    <div className="deck-colors">Colors: {colors.toString()}</div>
                    <ManaCurveChart deck={deck}/>
                </div>
            )
        }
        else {
            return(
                <div className="deck-stats empty">
                </div>
            )
        }
    }
}

export default connect(
    ({decks, selectedDeck}) => ({decks, selectedDeck})
    , {DeckActions})(DeckStats)