import React from 'react';
import { BrowserRouter, Link, Route, Redirect, withRouter } from 'react-router-dom'

import {compose} from 'redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import connect from '../libs/connect';
import CardActions from '../actions/CardActions'
import OldApp from './OldApp';
import CollectionsPage from './Collections/CollectionsPage';
import CardsPage from './Card/CardsPage';
import DecksPage from './Deck/DecksPage';

import { Button, Navbar, Alignment } from '@blueprintjs/core';
import CustomNavBar from './NavBar/CustomNavBar';

require('@blueprintjs/core/lib/css/blueprint.css')
require('@blueprintjs/icons/lib/css/blueprint-icons.css')
require('@blueprintjs/select/lib/css/blueprint-select.css')
require('normalize.css/normalize.css')

class App extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <BrowserRouter>
          <div>
            <CustomNavBar />
            <div>
              <Route path="/oldApp" component={OldApp}/>
              <Route path="/cards" component={CardsPage}/>
              <Route path="/collections" component={CollectionsPage}/>
              <Route path="/decks" component={DecksPage}/>
            </div>
          </div>
        </ BrowserRouter>
      );
    }
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(
    ({cards, filteredCards, cardSearchString, sets, selectedSet}) => 
    ({cards, filteredCards, cardSearchString, sets, selectedSet}),
    {CardActions}
  )
)(App)