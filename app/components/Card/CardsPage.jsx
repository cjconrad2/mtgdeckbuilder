import React from 'react';
import { H1, FormGroup, ControlGroup, Button, Icon } from '@blueprintjs/core';

import connect from '../../libs/connect';
import CardActions from '../../actions/CardActions';
import SetSelector from '../Selectors/SetSelector';
import TypeSelector from '../Selectors/TypeSelector';
import SubtypeSelector from '../Selectors/SubtypeSelector';
import CardBox from '../Menu/CardBox';

class CardsPage extends React.Component {
    render() {
        const {selectedSet, sets, types, selectedType, subtypes, selectedSubtype} = this.props;
        return (
            <div>
                <div className="menu-section">
                    <H1 className='page-header'>Cards</H1>
                    <div className='selector-section'>
                        <ControlGroup className="selector-with-label" fill={false}>
                            <Button disabled={true} className="selector-label">Set</Button>
                            <SetSelector className="selector" sets={sets} selectedSet={selectedSet} handleSetSelect={this.handleSetSelect}/>
                        </ControlGroup>
                        <ControlGroup className="selector-with-label">
                            <Button disabled={true} className="selector-label">Type</Button>
                            <TypeSelector className="selector" types={types} selectedType={selectedType} handleTypeSelect={this.handleTypeSelect}/>
                        </ControlGroup>
                        <ControlGroup className="selector-with-label">
                            <Button disabled={true} className="selector-label">Subtype</Button>
                            <SubtypeSelector className="selector" subtypes={subtypes} selectedSubtype={selectedSubtype} handleSubtypeSelect={this.handleSubtypeSelect}/>
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
}

export default connect(
    ({sets, selectedSet, types, selectedType, subtypes, selectedSubtype}) => 
    ({sets, selectedSet, types, selectedType, subtypes, selectedSubtype})
    , {CardActions})(CardsPage)