import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

export default class TypeSelector extends React.Component {
    render() {
        const {types, selectedType, handleTypeSelect, className} = this.props;
        return (
            <div className={className}>
                <Select
                    items={types}
                    itemRenderer={this.renderItems}
                    itemPredicate={this.itemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={handleTypeSelect}
                    resetOnClose={true}
                >
                    <Button 
                        icon="film" 
                        rightIcon="caret-down"
                        text={selectedType ? `${selectedType}` : 'No Selection'}/>
                </Select>
                
            </div>
        )
    }
    renderItems = (type, { handleClick, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled} 
                key={type}
                onClick={handleClick}
                text={type}
            />
        );
    }
    itemPredicate = (query, type) => {
        return type.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
}