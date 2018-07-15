import React from 'react';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import Notes from './Notes';
import LaneHeader from './LaneHeader';

class Lane extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className='lane'>
                <LaneHeader lane={this.props.lane} />
                <Notes
                    notes={selectNotesByIds(this.props.notes, this.props.lane.notes)}
                    onNoteClick={this.activateNoteEdit}
                    onEdit={this.editNote}
                    onDelete={this.deleteNote} />
            </div>
          );
    }
    editNote = (id, task) => {
        NoteActions.update({id, task, editing: false});
      };
    deleteNote = (noteId, e) => {
        e.stopPropagation();
        
        LaneActions.detachFromLane({
            laneId: this.props.lane.id,
            noteId
        });
        NoteActions.delete(noteId);
    };
    activateNoteEdit = id => {
        NoteActions.update({id, editing: true});
    };
}

function selectNotesByIds(allNotes, noteIds = []) {
    // `reduce` is a powerful method that allows us to
    // fold data. You can implement `filter` and `map`
    // through it. Here we are using it to concatenate
    // notes matching to the ids.
    return noteIds.reduce((notes, id) =>
      // Concatenate possible matching ids to the result
      notes.concat(
        allNotes.filter(note => note.id === id)
      )
    , []);
  }

export default connect(
    ({notes}) => ({
      notes
    }), {
      NoteActions,
      LaneActions
    }
  )(Lane)