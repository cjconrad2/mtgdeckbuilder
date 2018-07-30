import alt from '../libs/alt';

export default alt.generateActions(
    'create', 'update', 'delete',
    'attachToDeck', 'detachFromDeck',
    'moveCard', 'moveDeck'
);