import React from 'react'
import {compose} from 'redux'
import {DragSource, DropTarget} from 'react-dnd';

import ItemTypes from '../../constants/itemTypes';
import DeckActions from '../../actions/DeckActions'

class Card extends React.Component {
    render() {
        //console.log('card props', this.props)
        return compose(this.props.connectDragSource, this.props.connectDropTarget)(
            <div className="card">
                <img src={this.props.card.cardInfo.imageUrl} />
            </div>
        );
    }
}

const cardSource = {
    beginDrag(props) {
        console.log('begin dragging card', props);
        return {
            card: props.card,
            fromMenu: props.fromMenu
        };
    }
};

const cardTarget = {
    drop(targetProps, monitor) {
        const targetCardId = targetProps.card.uId;
        const sourceProps = monitor.getItem();
        const sourceCardId = sourceProps.card.uId;
        const sourceFromMenu = sourceProps.fromMenu

        console.log('dragging card', sourceProps, targetProps);
        console.log('sourceId', sourceCardId)
        console.log('targetId', targetCardId)
  
        if(sourceCardId && targetCardId && sourceCardId !== targetCardId) {
            targetProps.onMove({sourceCardId, targetCardId});
        }
        else if(targetCardId) {
            console.log('about to attachToDeckBasedOnCard. targetId: ', targetCardId)
            const card = sourceProps.card
            DeckActions.attachToDeckBasedOnCard({targetCardId, card, fromMenu: sourceFromMenu})
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