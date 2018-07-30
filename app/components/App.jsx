import React from 'react';
import uuid from 'uuid';
import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../libs/connect';
import Lanes from './Lanes';
import CardBox from './CardBox'
import Sets from './Sets'
import Menu from './Menu'

import LaneActions from '../actions/LaneActions';
import CardActions from '../actions/CardActions';
import SetActions from '../actions/SetActions';
import MagicApi from '../Api/MagicApi';

class App extends React.Component {
    render() {
      const {lanes} = this.props;
      const {sets} = this.props;
      const {selectedSet} = this.props;
      const {filteredCards} = this.props;
      const {cardSearchString} = this.props;
      return (
        <div>
          <button className="add-lane" onClick={this.addLane}>+</button>
          <Menu 
            sets={sets} 
            selectedSet={selectedSet}
            // TODO: THIS IS WHERE YOU SHOULD PICK UP. You added the map to make things work as is,
            // but cards here should be and array of {uid, cardInfo}
            cards={filteredCards.map(card => card.cardInfo)} 
            cardSearchString={cardSearchString} />
          <Lanes lanes={lanes} />
        </div>
      );
    }
    addLane = () => {
      const id = uuid.v4();
      LaneActions.create({
        id: id,
        key: id,
        name: '',
        editing: true
    });
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    ({lanes, cards, filteredCards, cardSearchString, sets, selectedSet}) => ({lanes, cards, filteredCards, cardSearchString, sets, selectedSet}),
    {LaneActions, CardActions, SetActions}
  )
)(App)