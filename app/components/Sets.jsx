import React from 'react';

import CardActions from '../actions/CardActions';
import connect from '../libs/connect';

class Sets extends React.Component {
    render() {
        console.log('sets props', this.props)
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
        CardActions.selectCardSet(event.target.value);
    }
}

export default connect(
    ({sets, selectedSet}) => ({sets, selectedSet}),
    {CardActions}
)(Sets)