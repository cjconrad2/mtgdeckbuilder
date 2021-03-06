import update from 'react-addons-update';

import LaneActions from '../actions/LaneActions';

export default class LaneStore {
  constructor() {
    this.bindActions(LaneActions);

    this.lanes = [];
  }
  create(lane) {
    // If `notes` aren't provided for some reason,
    // default to an empty array.
    lane.notes = lane.notes || [];
    console.log('New lane:', lane)
    this.setState({
      lanes: this.lanes.concat(lane)
    });
  }
  update(updatedLane) {
    this.setState({
        lanes: this.lanes.map(lane => {
            if(lane.id === updatedLane.id) {
                return Object.assign({}, lane, updatedLane);
            }
  
            return lane;
        })
    });
  }
  delete(laneId) {
      this.setState({
          lanes: this.lanes.filter(lane => lane.id !== laneId)
      })
  }
  attachToLane({laneId, noteId}) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.notes.includes(noteId)) {
          lane.notes = lane.notes.filter(note => note !== noteId);
        }

        if(lane.id === laneId) {
          lane.notes = lane.notes.concat([noteId]);
        }

        return lane;
      })
    });
  }
  detachFromLane({laneId, noteId}) {
    this.setState({
      lanes: this.lanes.map(lane => {
        if(lane.id === laneId) {
          lane.notes = lane.notes.filter(note => note !== noteId);
        }

        return lane;
      })
    });
  }
  moveNote({sourceId, targetId}) {
    const lanes = this.lanes;
    const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
    const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];
    const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
    const targetNoteIndex = targetLane.notes.indexOf(targetId);

    if(sourceLane === targetLane) {
      // move at once to avoid complications
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId]
        ]
      });
    }
    else {
      // get rid of the source
      sourceLane.notes.splice(sourceNoteIndex, 1);

      // and move it to target
      targetLane.notes.splice(targetNoteIndex, 0, sourceId);
    }

    this.setState({lanes});
  }
  moveLane({sourceId, targetId}){
    var lanes = this.lanes;
    const sourceLane = lanes.filter(lane => lane.id === sourceId)[0];
    const targetLane = lanes.filter(lane => lane.id === targetId)[0];
    const sourceLaneIndex = lanes.indexOf(sourceLane);
    const targetLaneIndex = lanes.indexOf(targetLane);
    console.log('source lane:', sourceLane, ' target lane:', targetLane)

    if(sourceLane === targetLane) {
        //DoNothing
    }
    else {
        lanes = update(lanes, {
            $splice: [
              [sourceLaneIndex, 1],
              [targetLaneIndex, 0, sourceLane]
            ]
          });
    }
    this.setState({lanes})
  }
}