import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boardsData';
import boards from '../boards/boards';

const createNewBoard = () => {
  const newBoardObject = {
    description: $('#board-description').val(),
    name: $('#board-name').val(),
    uid: firebase.auth().currentUser.uid,
  };
  boardsData.addBoard(newBoardObject)
    .then(() => {
      boards.printBoards();
      $('#new-board-form').trigger('reset');
    })
    .catch((err) => console.error('could not add a new board', err));
};

export default { createNewBoard };
