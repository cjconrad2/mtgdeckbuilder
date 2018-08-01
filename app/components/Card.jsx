import React from 'react'
import {compose} from 'redux'
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

class Card extends React.Component {
    render() {
        return compose(this.props.connectDragSource, this.props.connectDropTarget)(
            <div className="card">
                <img src={this.props.imageUrl} />
            </div>
        );
    }
}

const cardSource = {
    beginDrag(props) {
        console.log('begin dragging card', props);
        return {
            uId: props.uId
        };
    }
};

const cardTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.uId;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.uId;

        console.log('dragging card', sourceProps, targetProps);
  
        if(sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId});
        }
    }
};

export default compose(
    DragSource(ItemTypes.CARD, cardSource, connect => ({
        connectDragSource: connect.dragSource()
    })),
    DropTarget(ItemTypes.CARD, cardTarget, connect => ({
        connectDropTarget: connect.dropTarget()
    }))
)(Card)