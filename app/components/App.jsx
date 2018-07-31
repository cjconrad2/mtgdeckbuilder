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
      return (
        <div>
          <Menu />
          <DeckMat />
        </div>
      );
    }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    ({lanes, cards, filteredCards, cardSearchString, sets, selectedSet}) => 
    ({lanes, cards, filteredCards, cardSearchString, sets, selectedSet}),
    {LaneActions, CardActions, SetActions}
  )
)(App)