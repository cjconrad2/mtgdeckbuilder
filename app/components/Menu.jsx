import React from 'react';

import CardActions from '../actions/CardActions';
import MagicApi from '../Api/MagicApi';

import CardBox from './CardBox'
import Sets from './Sets'

export default class Menu extends React.Component {
    render() {
        return (
            <span className="menu">
                <Sets />
                <CardBox />
            </span>
        );
    }
}