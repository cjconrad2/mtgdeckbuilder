import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

export default class SetSelector extends React.Component {
    render() {
        const {sets, selectedSet, handleSetSelect, className} = this.props;
        return (
            <div className={className}>
                <Select
                    items={sets}
                    itemRenderer={this.renderItems}
                    itemPredicate={this.itemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={handleSetSelect}
                    resetOnClose={true}
                >
                    <Button 
                        className="select-button"
                        icon="filter" 
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
        return (
            <MenuItem
                active={modifiers.active}
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
}