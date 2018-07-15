import React from 'react';
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

import Editable from './Editable'

class Note extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const dragSource = this.props.editing ? a => a : this.props.connectDragSource;

        return compose(dragSource, this.props.connectDropTarget)(
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

const noteSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    }
};

const noteTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
  
        if(sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId});
        }
    }
};


export default compose(
    DragSource(ItemTypes.NOTE, noteSource, connect => ({
        connectDragSource: connect.dragSource()
    })),
    DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    }))
)(Note)