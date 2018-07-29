import React from 'react';

import connect from '../libs/connect';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable';


class LaneHeader extends React.Component {
    render() {
        return (
            <div className="lane-header" onClick={this.activateLaneEdit}>
                <Editable 
                    className="lane-name" 
                    editing={this.props.lane.editing}
                    value={this.props.lane.name} 
                    onEdit={this.editName} />
                <div className="lane-delete">
                    <button onClick={this.deleteLane}>x</button>
                </div>
            </div>
          );
    }
    activateLaneEdit = () => {
        LaneActions.update({
            id: this.props.lane.id,
            editing: true
        });
    };
    editName = name => {
        LaneActions.update({
            id: this.props.lane.id,
            name,
            editing: false
        });
    };
    deleteLane = e => {
        LaneActions.delete(this.props.lane.id)
    }
}

export default connect(
    () => ({}), {
      LaneActions
    }
)(LaneHeader)