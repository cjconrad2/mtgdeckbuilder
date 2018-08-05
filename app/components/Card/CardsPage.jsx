import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

import connect from '../../libs/connect';
import CardActions from '../../actions/CardActions'

class CardsPage extends React.Component {
    render() {
        const {selectedSet} = this.props;
        console.log(this.props)
        return (
            <div>
                <div>Hello Card World</div>
                <Select
                    items={this.props.sets}

                    itemRenderer={this.renderItems}
                    itemPredicate={this.itemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={this.handleItemSelect}
                    resetOnClose={true}
                    onQueryChange={this.handleQueryChange}
                    activeItem={this.props.activeSet}
                >
                    <Button 
                        icon="film" 
                        rightIcon="caret-down"
                        text={selectedSet ? `${selectedSet.name}` : 'No Selection'}/>
                </Select>
            </div>
        )
    }
    renderItems = (set, { handleClick, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        const active = this.props.activeSet && this.props.activeSet.code === set.code;
        return (
            <MenuItem
                active={active}
                disabled={modifiers.disabled} 
                label={set.code}
                key={set.code}
                onClick={handleClick}
                text={set.name}
            />
        );
    }
    itemPredicate = (query, set) => {
        return set.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
    handleItemSelect = (selectedSet) => {
        console.log('in handleItemSelect')
        CardActions.selectCardSet(selectedSet)
    }
    handleQueryChange = (query) => {
        console.log('in handleQueryChange')
        CardActions.handleQueryChange(query)
    }
}

export default connect(
    ({sets, selectedSet, activeSet}) => ({sets, selectedSet, activeSet})
    , {CardActions})(CardsPage)