import React from 'react';
import uuid from 'uuid';

import Notes from './Notes';

export default class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        notes: [
          {
            id: uuid.v4(),
            editing: false,
            task: 'Learn React'
          },
          {
            id: uuid.v4(),
            editing: false,
            task: 'Do laundry'
          }
        ]
      };
    }
    render() {
      const {notes} = this.state;
  
      return (
        <div>
          <button className="add-note" onClick={this.addNote}>+</button>
          <Notes 
            onNoteClick={this.activateNoteEdit}
            onEdit={this.editNote}
            onDelete={this.deleteNote}
            notes={notes} />
        </div>
      );
    }

    addNote = () => {
      // It would be possible to write this in an imperative style.
      // I.e., through `this.state.notes.push` and then
      // `this.setState({notes: this.state.notes})` to commit.
      //
      // I tend to favor functional style whenever that makes sense.
      // Even though it might take more code sometimes, I feel
      // the benefits (easy to reason about, no side effects)
      // more than make up for it.
      //
      // Libraries, such as Immutable.js, go a notch further.
      this.setState({
        notes: this.state.notes.concat([{
          id: uuid.v4(),
          task: '',
          editing: true
        }])
      });
    }

    deleteNote = (id, e) => {
        e.stopPropagation();
        this.setState({
            notes: this.state.notes.filter(note => note.id !== id)
        });
    }

    activateNoteEdit = (id, e) => {
        console.log('Note clicked')
        console.log(id)
        this.setState({
            notes: this.state.notes.map(note => {
              console.log(note)
                if(note.id === id) {
                    console.log('editing set to true')
                    note.editing = true;
                    
                }
                return note;
            })
        });
    }

    editNote = (id, task) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if(note.id === id) {
                    note.editing = false;
                    note.task = task;
                }
                return note;
            })
        });
    }
  }