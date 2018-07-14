import React from 'react';

import Editable from './Editable'

export default class Note extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="note" onClick={this.props.onNoteClick}>
                <Editable 
                    className="editable"
                    editing={this.props.editing}
                    value={this.props.task}
                    onEdit={this.props.onEdit}/>
                <button className="delete" onClick={this.props.onDelete}>x</button>
            </div>
        );
    }
}