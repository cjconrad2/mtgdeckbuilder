import React from 'react';
import Lane from './Lane';
import LaneActions from '../actions/LaneActions'

export default class Lanes extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="lanes">{this.props.lanes.map(lane =>
                    <Lane 
                        className="lane"
                        onMove={LaneActions.moveLane} 
                        key={lane.id} 
                        lane={lane} />
                )}
            </div>
        )
    }
}