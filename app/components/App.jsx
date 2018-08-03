import React from 'react';
import uuid from 'uuid';
import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../libs/connect';
import Menu from './Menu/Menu';
import DeckMat from './Deck/DeckMat';
import AnalyticPanel from './Analytics/AnalyticsPanel';

import CardActions from '../actions/CardActions';
import DeckActions from '../actions/DeckActions';
import MagicApi from '../Api/MagicApi';

class App extends React.Component {
    render() {
      return (
        <div>
          <Menu />
          <DeckMat />
          <AnalyticPanel />
        </div>
      );
    }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    ({cards, filteredCards, cardSearchString, sets, selectedSet}) => 
    ({cards, filteredCards, cardSearchString, sets, selectedSet}),
    {CardActions}
  )
)(App)