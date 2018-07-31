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
import DeckMat from './DeckMat'

import LaneActions from '../actions/LaneActions';
import CardActions from '../actions/CardActions';
import SetActions from '../actions/SetActions';
import DeckActions from '../actions/DeckActions';
import MagicApi from '../Api/MagicApi';

class App extends React.Component {
    render() {
      const {lanes} = this.props;
      const {sets} = this.props;
      const {selectedSet} = this.props;
      const {filteredCards} = this.props;
      const {cardSearchString} = this.props;
      const {decks} = this.props;
      return (
        <div>
          <button className="add-lane" onClick={this.addLane}>+</button>
          <Menu 
            sets={sets} 
            selectedSet={selectedSet}
            cards={filteredCards} 
            cardSearchString={cardSearchString} />
          <DeckMat decks={decks}/>
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
    ({lanes, cards, filteredCards, cardSearchString, sets, selectedSet, decks}) => 
    ({lanes, cards, filteredCards, cardSearchString, sets, selectedSet, decks}),
    {LaneActions, CardActions, SetActions, DeckActions}
  )
)(App)