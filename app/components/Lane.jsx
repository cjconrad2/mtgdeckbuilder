import React from 'react';
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';
import uuid from 'uuid';

import ItemTypes from '../constants/itemTypes';
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
        return compose(this.props.connectLaneDragSource, this.props.connectLaneDropTarget, this.props.connectNoteDropTarget)(
            <div className='lane'>
                <LaneHeader lane={this.props.lane} />
                <Notes
                    notes={selectNotesByIds(this.props.notes, this.props.lane.notes)}
                    onNoteClick={this.activateNoteEdit}
                    onEdit={this.editNote}
                    onDelete={this.deleteNote} />
                <div className='add-card-wrapper' onClick={this.addNote}>
                    <div className='add-card'>Add card</div>
                </div>
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
    addNote = e => {
        e.stopPropagation();
        const noteId = uuid.v4();
        console.log('about to add note')
    
        NoteActions.create({
            id: noteId,
            task: '',
            editing: true,
            newNote: true
        });
        LaneActions.attachToLane({
            laneId: this.props.lane.id,
            noteId
        });
    };
}

const laneDragSource = {
    beginDrag(props) {
        return {
            id: props.lane.id
        };
    }
};

const laneDropTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.lane.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
  
        if(sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId});
        }
    }
};

const noteDropTarget = {
    hover(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
  
        // If the target lane doesn't have notes,
        // attach the note to it.
        //
        // `attachToLane` performs necessarly
        // cleanup by default and it guarantees
        // a note can belong only to a single lane
        // at a time.
      if(!targetProps.lane.notes.length) {
            LaneActions.attachToLane({
                laneId: targetProps.lane.id,
                noteId: sourceId
            });
      }
    }
};

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


export default compose(
    DragSource(ItemTypes.LANE, laneDragSource, connect => ({
        connectLaneDragSource: connect.dragSource()
    })),
    DropTarget(ItemTypes.LANE, laneDropTarget, connect => ({
        connectLaneDropTarget: connect.dropTarget()
    })),
    DropTarget(ItemTypes.NOTE, noteDropTarget, connect => ({
        connectNoteDropTarget: connect.dropTarget()
    })),
    connect(({notes}) => ({
        notes
    }), {
        NoteActions,
        LaneActions
    })
)(Lane)