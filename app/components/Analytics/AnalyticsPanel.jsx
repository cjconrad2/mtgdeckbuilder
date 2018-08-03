import React from 'React';
import DeckList from './DeckList';
import DeckStats from './DeckStats';

export default class AnalyticsPanel extends React.Component {
    render() {
        return(
            <div className="analytics-panel">
                <DeckList />
                <DeckStats />
            </div>
        )
    }
}
