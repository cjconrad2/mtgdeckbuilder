import storage from '../../libs/storage';
import persist from '../../libs/persist';
import NoteStore from '../../stores/NoteStore';
import LaneStore from '../../stores/LaneStore';
import CardStore from '../../stores/CardStore';
import SetStore from '../../stores/SetStore';

export default alt => {
  alt.addStore('NoteStore', NoteStore);
  alt.addStore('LaneStore', LaneStore);
  alt.addStore('CardStore', CardStore);
  alt.addStore('SetStore', SetStore);

  //persist(alt, storage(localStorage), 'app');
}