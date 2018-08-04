import React from 'React';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import connect from '../../../libs/connect';
import DeckActions from '../../../actions/DeckActions';

export default class ManaCurveChart extends React.Component {
    render() {
        const deck = this.props.deck;
        const maxConvertedManaCost = Math.max(...deck.cards.map(card => card.cardInfo.cmc));
        console.log('max mana cost', maxConvertedManaCost)
        var maxCardCount = 0;
        var data = [];
        var i;
        for (i=0; i <= maxConvertedManaCost; i++) {
            const cardCount = deck.cards.filter(card => card.cardInfo.cmc === i).length;
            if(cardCount > maxCardCount) {
                maxCardCount = cardCount
            }
            const dataPoint = {name: i, cardCount: cardCount}
            data.push(dataPoint)
        }
        console.log('chart data', data)
        return(
            <div className="mana-curve-chart">
                <div className="chart-title">Mana Curve</div>
                <LineChart width={600} height={400} data={data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name" label="Converted Mana Cost" height={80}/>
                    <YAxis allowDecimals={false} domain={[0, maxCardCount]} label={{ value: 'Count', angle: -90, position: 'insideLeft' }}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Line type="monotone" name="Card Count" dataKey="cardCount" stroke="#82ca9d" />
                </LineChart>
            </div>
        )
    }
}