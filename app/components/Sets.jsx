import React from 'react';

import Set from './Set'

export default class Sets extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="set-wrapper">
                <select value={this.props.selectedSet.code} onChange={this.props.handleSelectSet}>
                    {this.props.sets.map(({code, name}) => 
                        <option key={code} value={code}>{name}</option>
                    )}
                </select>
            </div>
          );
    }
}