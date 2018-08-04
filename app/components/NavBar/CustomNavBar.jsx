import React from 'react'
import { Button, Navbar, Alignment } from '@blueprintjs/core';

import CustomNavLink from './CustomNavLink';

export default class CustomNavBar extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>MTG Deck Builder</Navbar.Heading>
                    <Navbar.Divider />
                    <CustomNavLink to="/cards" className="bp3-minimal" icon="duplicate" text="Cards"/>
                    <CustomNavLink to="/collections" className="bp3-minimal" icon="grid-view" text="Collections"/>
                    <CustomNavLink to="/decks" className="bp3-minimal" icon="layers" text="Decks"/>
                    <CustomNavLink to="/oldApp" className="bp3-minimal" icon="ban-circle" text="Old App"/>
                </Navbar.Group>
            </Navbar>
        )
    }
}