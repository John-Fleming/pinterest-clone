import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardsData from '../../helpers/data/boardsData';

const printBoards = () => {
  const myUid = firebase.auth().currentUser.uid;
  boardsData.getBoardsByUid(myUid)
    .then((boards) => {
      const domString = '<h1 class="text-center mt-3">Boards</h1>';
      utils.printToDom('boards-container', domString);
      console.error('response', boards);
    })
    .catch((err) => console.error('could not get boards', err));
};

export default { printBoards };
