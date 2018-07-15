import React from 'react';
import uuid from 'uuid';
import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../libs/connect';
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';

class App extends React.Component {
    render() {
      const {lanes} = this.props;
      return (
        <div>
          <button className="add-lane" onClick={this.addLane}>+</button>
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
    ({lanes}) => ({lanes}),
    {LaneActions}
  )
)(App)