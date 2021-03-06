import React from 'react';

import connect from '../../libs/connect';
import CardList from '../Card/CardList';
import CardActions from '../../actions/CardActions';

class CardBox extends React.Component {
    render() {
        //console.log(this.props)
        return (
            <ul className="card-box">
                <input className="card-search" value={this.props.cardSearchString} onChange={this.handleCardSearchChange}/>
                <CardList 
                    fromMenu={true} 
                    cards={this.props.filteredCards}/>
            </ul>
          );
    }
    handleCardSearchChange = (event) => {
        CardActions.searchCards(event.target.value)
    }
}

export default connect(
    ({cardSearchString, filteredCards, sets}) => ({cardSearchString, filteredCards, sets}),
    {CardActions}
)(CardBox)