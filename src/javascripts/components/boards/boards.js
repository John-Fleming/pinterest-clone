import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardsData from '../../helpers/data/boardsData';
import boardCardsBuilder from '../boardCardsBuilder/boardCardsBuilder';
import singleBoard from '../singleBoard/singleBoard';
import pinsData from '../../helpers/data/pinsData';

const removeBoard = (e) => {
  const boardId = e.target.closest('.card').id;
  boardsData.deleteBoard(boardId)
    .then(() => {
      pinsData.getPinsByBoardId(boardId).then((pins) => {
        pins.forEach((pin) => {
          pinsData.deletePin(pin.id);
        });
      });
      // eslint-disable-next-line no-use-before-define
      printBoards();
    })
    .catch((err) => console.error('remove board broke', err));
};

const printBoards = () => {
  const firebaseUser = firebase.auth().currentUser;
  const myUid = firebaseUser.uid;
  boardsData.getBoardsByUid(myUid)
    .then((boards) => {
      let domString = '';
      domString += `<h1 class="text-center my-3">${firebaseUser.displayName}'s Boards</h1>`;
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      boards.forEach((board) => {
        domString += boardCardsBuilder.buildBoardCards(board);
      });
      domString += '</div>';
      utils.printToDom('boards-container', domString);
      $('body').on('click', '.view-board-btn', singleBoard.viewBoardEvent);
      $('body').on('click', '.delete-board-btn', removeBoard);
    })
    .catch((err) => console.error('could not get boards', err));
};

export default { printBoards };
