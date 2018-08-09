import * as React from 'react';

import { Keys, NumericInput, Position } from '@blueprintjs/core';

export class ManaCostSelector extends React.Component {
    state = {
        value: '0',
        startingValue: this.props.startingCmc ? this.props.startingCmc : '0'
    }
    render() {
        const {value} = this.state;
        return (
            <NumericInput 
                buttonPosition="none"
                onBlur={this.handleOnBlur}
                onKeyDown={this.handleKeyDown}
                onValueChange={this.handleValueChange}
                value={value}/>
        )
    }
    handleOnBlur = (e) => {
        console.log('in on blur', this.state.value, this.state.startingValue)
        if(this.state.value !== this.state.startingValue) {
            this.props.handleSubmitManaCost(e.target.value);
        }
    }
    handleKeyDown = (e) => {
        if(e.keyCode === Keys.ENTER) {
            if(this.state.value !== this.state.startingValue) {
                this.props.handleSubmitManaCost(e.target.value);
            }
        }
    }
    handleValueChange = (valueAsNumber, valueAsString) => {
        this.setState({
            value: valueAsString
        });
    }
}
