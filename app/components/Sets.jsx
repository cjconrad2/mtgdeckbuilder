import React from 'react';

import SetActions from '../actions/SetActions';
import connect from '../libs/connect';

class Sets extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="set-wrapper">
                <select value={this.props.selectedSet.code} onChange={this.handleSelectSet}>
                    {this.props.sets.map(({code, name}) => 
                        <option key={code} value={code}>{name}</option>
                    )}
                </select>
            </div>
          );
    }
    handleSelectSet = (event) => {
        SetActions.selectSet(event.target.value);
    }
}

export default connect(
    ({sets, selectedSet}) => ({sets, selectedSet}),
    {SetActions}
)(Sets)