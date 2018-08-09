import uuid from 'uuid';

import CardActions from '../actions/CardActions';
import MagicApi from '../Api/MagicApi'

export default class CardStore {
    constructor() {
      this.bindActions(CardActions);
  
      this.cards = [];
      this.filteredCards = [];
      this.cardSearchString = '';
      this.selectedCards = [];
      this.sets = [];
      this.types = [];
      this.subtypes = [];
      this.colors = ['Black', 'Blue', 'Green', 'Red', 'White'];
      this.rarities = ['Common', 'Uncommon', 'Rare', 'Mythic Rare']
      MagicApi.getSets();
      MagicApi.getTypes();
      MagicApi.getSubtypes();
    }
  
    receiveCards(cards) {
        if(cards) {
            const newCards = cards.map(card => {return {uId: undefined, cardInfo: card}})
            this.setState({
                cards: newCards,
                filteredCards: newCards.filter(card => card.cardInfo.name.includes(this.cardSearchString))
            });
        }
        else {
            console.log('No Mmatching cards')
        }
    }

    searchCards(searchString) {
        this.setState({
            filteredCards: this.cards.filter(card => card.cardInfo.name.toLowerCase().includes(searchString.toLowerCase())),
            cardSearchString: searchString
        });
    }

    receiveCardSets(responseBody) {
        this.setState({
            sets: responseBody.sets
        });
    }

    selectCardSet(selectedSet) {
        this.setState({
            selectedSet: this.sets.filter(set => set.code === selectedSet.code)[0]
        });
        this.fireMagicApiGetCards()
    }

    receiveTypes(responseBody) {
        this.setState({
            types: responseBody.types
        });
    }

    selectCardType(selectedType) {
        this.setState({
            selectedType: selectedType
        });
        this.fireMagicApiGetCards()
    }

    receiveSubtypes(responseBody) {
        this.setState({
            subtypes: responseBody.subtypes
        });
    }

    selectCardSubtype(selectedSubtype) {
        this.setState({
            selectedSubtype: selectedSubtype
        });
        this.fireMagicApiGetCards()
    }

    selectCardColor(selectedColor) {
        this.setState({
            selectedColor: selectedColor
        });
        this.fireMagicApiGetCards();
    }

    selectCardRarity(selectedRarity) {
        this.setState({
            selectedRarity: selectedRarity
        });
        this.fireMagicApiGetCards();
    }

    selectCardCost(cmcValue) {
        this.setState({
            cmcValue: cmcValue
        });
        this.fireMagicApiGetCards();
    }

    selectCardName(selectedName) {
        this.setState({
            selectedName: selectedName
        });
        this.fireMagicApiGetCards();
    }

    fireMagicApiGetCards() {
        const setCode = this.selectedSet ? this.selectedSet.code : undefined;
        const type = this.selectedType ? this.selectedType : undefined;
        const subtype = this.selectedSubtype ? this.selectedSubtype : undefined
        const color = this.selectedColor ? this.selectedColor : undefined
        const rarity = this.selectedRarity ? this.selectedRarity : undefined
        const cmc = this.cmcValue ? this.cmcValue : undefined
        const name = this.selectedName ? this.selectedName : undefined
        MagicApi.getCards({setCode, type, subtype, color, rarity, cmc, name});
    }
  }