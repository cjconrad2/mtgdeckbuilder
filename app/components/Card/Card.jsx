import React from 'react'
import {compose} from 'redux'
import {DragSource, DropTarget} from 'react-dnd';

import ItemTypes from '../../constants/itemTypes';
import DeckActions from '../../actions/DeckActions'
import CardOptionsMenu from './CardOptionsMenu'

import { Button, Card, Elevation, H5, H3, Collapse, Icon, Popover, Position } from '@blueprintjs/core';

class MagicCard extends React.Component {
    state = {
        isOpen: true
    }
    render() {
        const {card} = this.props;
        const {isOpen} = this.state;
        return compose(this.props.connectDragSource, this.props.connectDropTarget)(
            <div className="magic-card">
                <Card interactive={true} elevation={Elevation.TWO} onClick={this.handleCardClick}>
                    <div className="card-header">
                        <H3>{card.cardInfo.name}
                            <Popover className="card-header-more" content={<CardOptionsMenu />} position={Position.RIGHT_TOP}>
                                <Icon icon="more"/>
                            </Popover>
                        </H3>
                    </div>
                    <Collapse isOpen={isOpen}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="card-info">
                                            <div className="card-property">
                                                <b>Type: </b><span>{card.cardInfo.type}</span>
                                            </div>
                                            <div className="card-property">
                                                    <b>{card.cardInfo.colors && card.cardInfo.colors.length > 1 ? 'Colors: ' : 'Color: '}</b>
                                                    <span>{card.cardInfo.colors ? card.cardInfo.colors.join(', ') : 'Colorless'}</span>
                                            </div>
                                            <div className="card-property">
                                                <b>Type: </b><span>{card.cardInfo.type}</span>
                                            </div>
                                            <div className="card-property">
                                                <b>Type: </b><span>{card.cardInfo.type}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="card-image">
                                            <img src={this.props.card.cardInfo.imageUrl} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Collapse>
                </Card>
            </div>
        );
    }
    handleCardClick = (e) => {
        e.persist();
        if (e.target.attributes['data-icon'] && e.target.attributes['data-icon'].value === 'more') {
            return;
        }
        this.setState({
            isOpen: !this.state.isOpen
        })
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
)(MagicCard)