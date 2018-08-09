import alt from '../libs/alt';

export default alt.generateActions(
    'receiveCards', 'searchCards', 
    'receiveCardSets', 'selectCardSet',
    'receiveTypes', 'selectCardType',
    'receiveSubtypes', 'selectCardSubtype',
    'selectCardColor', 'selectCardRarity', 'selectCardCost', 'selectCardName'
);