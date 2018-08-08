import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';

export default class CardOptionMenu extends React.Component {
    render() {
        return (
            <Menu>
                <MenuItem icon="grid-view" text="Add to collection"/>
            </Menu>
        )
    }
}