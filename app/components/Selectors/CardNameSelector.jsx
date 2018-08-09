import * as React from 'react';

import { Keys, InputGroup } from '@blueprintjs/core';

export class CardNameSelector extends React.Component {
    state = {
        value: '',
        startingValue: this.props.startingName ? this.props.startingName : ''
    }
    render() {
        const {value} = this.state;
        return (
            <InputGroup 
                onBlur={this.handleOnBlur}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleValueChange}
                value={value}/>
        )
    }
    handleOnBlur = (e) => {
        console.log('in on blur', this.state.value, this.state.startingValue)
        if(this.state.value !== this.state.startingValue) {
            this.props.handleNameChange(e.target.value);
        }
    }
    handleKeyDown = (e) => {
        if(e.keyCode === Keys.ENTER) {
            if(this.state.value !== this.state.startingValue) {
                this.props.handleNameChange(e.target.value);
            }
        }
    }
    handleValueChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }
}
