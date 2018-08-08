import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

export default class SubtypeSelector extends React.Component {
    render() {
        const {subtypes, selectedSubtype, handleSubtypeSelect, className} = this.props;
        return (
            <div className={className}>
                <Select
                    items={subtypes}
                    itemRenderer={this.renderItems}
                    itemPredicate={this.itemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={handleSubtypeSelect}
                    resetOnClose={true}
                >
                    <Button 
                        icon="film" 
                        rightIcon="caret-down"
                        text={selectedSubtype ? selectedSubtype : 'No Selection'}/>
                </Select>   
            </div>
        )
    }
    renderItems = (subtype, { handleClick, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled} 
                key={subtype}
                onClick={handleClick}
                text={subtype}
            />
        );
    }
    itemPredicate = (query, subtype) => {
        return subtype.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
}