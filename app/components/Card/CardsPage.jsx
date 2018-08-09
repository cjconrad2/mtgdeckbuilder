import React from 'react';
import { H1, FormGroup, ControlGroup, Button, Icon, NumericInput } from '@blueprintjs/core';

import connect from '../../libs/connect';
import CardActions from '../../actions/CardActions';
import SetSelector from '../Selectors/SetSelector';
import BasicSelector from '../Selectors/BasicSelector';
import CardBox from '../Menu/CardBox';
import { ManaCostSelector } from '../Selectors/ManaCostSelector';
import { CardNameSelector } from '../Selectors/CardNameSelector';

class CardsPage extends React.Component {
    render() {
        const {selectedSet, sets, types, selectedType, subtypes, selectedSubtype, colors, selectedColor, rarities, selectedRarity, cmcValue, startingName} = this.props;
        return (
            <div>
                <div className="menu-section">
                    <H1 className='page-header'>Cards</H1>
                    <div className='selector-section'>
                        <ControlGroup className="selector-with-label">
                            <Button disabled={true} className="selector-label">Name</Button>
                            <CardNameSelector handleNameChange={this.handleNameChange} startingName={startingName}/>
                        </ControlGroup>
                        <ControlGroup className="selector-with-label" fill={false}>
                            <Button disabled={true} className="selector-label">Set</Button>
                            <SetSelector className="selector" sets={sets} selectedSet={selectedSet} handleSetSelect={this.handleSetSelect}/>
                        </ControlGroup>
                        <ControlGroup className="selector-with-label">
                            <Button disabled={true} className="selector-label">Type</Button>
                            <BasicSelector 
                                className="selector" 
                                items={types} 
                                selectedItem={selectedType} 
                                handleItemSelect={this.handleTypeSelect} 
                                icon="filter"/>
                        </ControlGroup>
                        <ControlGroup className="selector-with-label">
                            <Button disabled={true} className="selector-label">Subtype</Button>
                            <BasicSelector 
                                className="selector" 
                                items={subtypes} 
                                selectedItem={selectedSubtype} 
                                handleItemSelect={this.handleSubtypeSelect}
                                icon="filter"/>
                        </ControlGroup>
                        <ControlGroup className="selector-with-label">
                            <Button disabled={true} className="selector-label">Color</Button>
                            <BasicSelector 
                                className="selector" 
                                items={colors} 
                                selectedItem={selectedColor} 
                                handleItemSelect={this.handleColorSelect}
                                icon="filter"/>
                        </ControlGroup>
                        <ControlGroup className="selector-with-label">
                            <Button disabled={true} className="selector-label">Rarity</Button>
                            <BasicSelector 
                                className="selector" 
                                items={rarities} 
                                selectedItem={selectedRarity} 
                                handleItemSelect={this.handleRaritySelect}
                                icon="filter"/>
                        </ControlGroup>
                        <ControlGroup className="selector-with-label">
                            <Button disabled={true} className="selector-label">Cost</Button>
                            <ManaCostSelector handleSubmitManaCost={this.handleSubmitManaCost} startingCmc={cmcValue}/>
                        </ControlGroup>
                    </div>
                </div>
                <div className="card-section">
                    <CardBox/>
                </div>
            </div>
        )
    }
    handleSetSelect = (selectedSet) => {
        CardActions.selectCardSet(selectedSet)
    }
    handleTypeSelect = (selectedType) => {
        CardActions.selectCardType(selectedType)
    }
    handleSubtypeSelect = (selectedSubtype) => {
        CardActions.selectCardSubtype(selectedSubtype)
    }
    handleColorSelect = (selectedColor) => {
        CardActions.selectCardColor(selectedColor)
    }
    handleRaritySelect = (selectedRarity) => {
        CardActions.selectCardRarity(selectedRarity)
    }
    handleSubmitManaCost = (cmcValue) => {
        CardActions.selectCardCost(cmcValue)
    }
    handleNameChange = (name) => {
        CardActions.selectCardName(name)
    }
}

export default connect(
    ({sets, selectedSet, types, selectedType, subtypes, selectedSubtype, colors, selectedColor, rarities, selectedRarity, cmcValue, startingName}) => 
    ({sets, selectedSet, types, selectedType, subtypes, selectedSubtype, colors, selectedColor, rarities, selectedRarity, cmcValue, startingName})
    , {CardActions})(CardsPage)