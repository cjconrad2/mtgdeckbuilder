import React from 'react';
import uuid from 'uuid';
import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../libs/connect';
import Lanes from './Lanes';
import CardBox from './CardBox'
import Sets from './Sets'
import LaneActions from '../actions/LaneActions';
import CardActions from '../actions/CardActions';
import SetActions from '../actions/SetActions';
import MagicApi from '../Api/MagicApi';

class App extends React.Component {
    render() {
      const {lanes} = this.props;
      const {cards} = this.props;
      const {sets} = this.props;
      const {selectedSet} = this.props;
      const {filteredCards} = this.props;
      const {cardSearchString} = this.props;
      return (
        <div>
          <button className="add-lane" onClick={this.addLane}>+</button>
          <button className="get-cards" onClick={this.getCards}>Get Cards</button>
          <button className="get-sets" onClick={this.getSets}>Get Sets</button>
          <Sets sets={sets} selectedSet={selectedSet} handleSelectSet={this.handleSelectSet}/>
          <CardBox cards={filteredCards} cardSearchString={cardSearchString} handleCardSearchChange={this.handleCardSearchChange}/>
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

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    ({lanes, cards, filteredCards, cardSearchString, sets, selectedSet}) => ({lanes, cards, filteredCards, cardSearchString, sets, selectedSet}),
    {LaneActions, CardActions, SetActions}
  )
)(App)