import React from 'react';

import classnames from 'classnames';

export default class Editable extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        if(this.props.editing) {
            return <Edit 
                className={this.props.className}
                value={this.props.value} 
                onEdit={this.props.onEdit}/>
        }
        return <span className={classnames('value', this.props.className)}>{this.props.value}</span>;
    }
} 

class Edit extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return <input
            type="text"
            className={classnames('edit', this.props.className)}
            autoFocus={true}
            defaultValue={this.props.value}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter} />;
    }
    checkEnter = (e) => {
        if(e.key === 'Enter') {
          this.finishEdit(e);
        }
    }
    finishEdit = (e) => {
        const value = e.target.value;
    
        if(this.props.onEdit) {
          this.props.onEdit(value);
        }
    }
}