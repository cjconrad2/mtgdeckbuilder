import React from 'react';
import {compose} from 'redux';
import {DragSource, DropTarget} from 'react-dnd';
import uuid from 'uuid';

import ItemTypes from '../../constants/itemTypes';
import connect from '../../libs/connect';
import DeckActions from '../../actions/DeckActions';
import CardList from '../Card/CardList';
import DeckHeader from './DeckHeader';

class Deck extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        //console.log('deck props', this.props)
        return compose(this.props.connectDeckDragSource, this.props.connectDeckDropTarget, this.props.connectCardDropTarget)(
            <div className="deck">
                <DeckHeader deck={this.props.deck} />
                <CardList 
                    fromMenu={false}
                    cards={this.props.deck.cards}
                    onDelete={this.deleteCard} />
            </div>
          );
    }
    deleteCard = (cardId, e) => {
        e.stopPropagation();
        
        DeckActions.detachFromDeck({
            deckId: this.props.deck.id,
            cardId
        });
    };
}

const deckDragSource = {
    beginDrag(props) {
        return {
            id: props.deck.id
        };
    }
};

const deckDropTarget = {
    hover(targetProps, monitor) {
        const targetId = targetProps.deck.id;
        const sourceProps = monitor.getItem();
        const sourceId = sourceProps.id;
  
        if(sourceId !== targetId) {
            targetProps.onMove({sourceId, targetId});
        }
    }
};

const cardDropTarget = {
    drop(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        const sourceCard = sourceProps.card;
        const sourceFromMenu = sourceProps.fromMenu;
  
        // If the target deck doesn't have cards,
        // attach the card to it.
        //
        // `attachToDeck` performs necessarly
        // cleanup by default and it guarantees
        // a card can belong only to a single deck
        // at a time.
      if(!targetProps.deck.cards.length) {
            DeckActions.attachToDeck({
                deckId: targetProps.deck.id,
                card: sourceCard,
                fromMenu: sourceFromMenu
            });
      }
    }
};


export default compose(
    DragSource(ItemTypes.DECK, deckDragSource, connect => ({
        connectDeckDragSource: connect.dragSource()
    })),
    DropTarget(ItemTypes.DECK, deckDropTarget, connect => ({
        connectDeckDropTarget: connect.dropTarget()
    })),
    DropTarget(ItemTypes.CARD, cardDropTarget, connect => ({
        connectCardDropTarget: connect.dropTarget()
    })),
    connect(({cards}) => ({
        cards
    }), {
        DeckActions
    })
)(Deck)