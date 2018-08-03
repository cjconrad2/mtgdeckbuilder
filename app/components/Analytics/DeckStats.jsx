import React from 'React';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import connect from '../../libs/connect';
import DeckActions from '../../actions/DeckActions';

class DeckStats extends React.Component {
    render() {
        const deck = this.props.decks.filter(deck => deck.id === this.props.selectedDeck)[0]
        if(deck) {
            console.log('deck', deck)
            const cardCount = deck.cards.length
            const colors = deck.cards.map(card => card.cardInfo.colors)
                .reduce((accumulator, currentValue) => accumulator.concat(currentValue))
                .filter((v,i,a) => a.indexOf(v) === i);

            const data = [
                {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
                {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
                {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
                {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
                {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
                {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
            ];
            return(
                <div className="deck-stats">
                    <div className="deck-name">Name: {deck.name}</div><br></br>
                    <div className="deck-card-count">Card Count: {cardCount}</div>
                    <div className="deck-colors">Colors: {colors.toString()}</div>
                    <LineChart width={600} height={300} data={data}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
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