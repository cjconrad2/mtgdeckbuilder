import React from 'react';
import uuid from 'uuid';
import { H5, Collapse, Icon } from '@blueprintjs/core';

export default class CardRulings extends React.Component {
    state = {
        isOpen: false
    }
    render() {
        const {rulings} = this.props;
        const {isOpen} = this.state;
        return (
            <div className="card-rulings">
                <div className="card-property">
                    <b>Rulings: </b><span>{rulings.length}</span><a className="card-ruling-show-hide" onClick={this.handleShowDetails}>{isOpen ? 'hide' : 'show'}</a>
                </div>
                <Collapse isOpen={isOpen}>
                    {rulings.map(ruling => 
                        <div key={uuid.v4()} className="card-ruling">
                            <b>{ruling.date}</b>
                            <p>{ruling.text}</p>
                        </div>)
                    }
                </Collapse>
            </div>
        )
    }
    handleShowDetails = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}