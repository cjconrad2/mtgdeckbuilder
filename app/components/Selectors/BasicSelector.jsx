import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

export default class BasicSelector extends React.Component {
    render() {
        const {items, selectedItem, handleItemSelect, className, icon} = this.props;
        return (
            <div className={className}>
                <Select
                    items={items}
                    itemRenderer={this.renderItems}
                    itemPredicate={this.itemPredicate}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    onItemSelect={handleItemSelect}
                    resetOnClose={true}
                >
                    <Button 
                        icon={icon}
                        rightIcon="caret-down"
                        text={selectedItem ? `${selectedItem}` : 'No Selection'}/>
                </Select>
                
            </div>
        )
    }
    renderItems = (item, { handleClick, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled} 
                key={item}
                onClick={handleClick}
                text={item}
            />
        );
    }
    itemPredicate = (query, item) => {
        return item.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }
}