import React from 'react';

import Note from './Note';

export default class Notes extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ul className="notes">{this.props.notes.map(({id, editing, task}) =>
                <li key={id}>
                    <Note
                        onNoteClick={this.props.onNoteClick.bind(null, id)}
                        editing={editing}
                        onEdit={this.props.onEdit.bind(null, id)} 
                        onDelete={this.props.onDelete.bind(null, id)}
                        task={task} />
                </li>
              )}</ul>
        )
    }
} 