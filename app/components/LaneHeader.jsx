import React from 'react';
import uuid from 'uuid';

import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable';


class LaneHeader extends React.Component {
    render() {
        return (
            <div className="lane-header" onClick={this.activateLaneEdit}>
                <div className="lane-add-note">
                    <button onClick={this.addNote}>+</button>
                </div>
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
    addNote = e => {
        e.stopPropagation();
    
        const noteId = uuid.v4();
    
        NoteActions.create({
            id: noteId,
            task: '',
            editing: true
        });
        LaneActions.attachToLane({
            laneId: this.props.lane.id,
            noteId
        });
    };
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
      NoteActions,
      LaneActions
    }
)(LaneHeader)