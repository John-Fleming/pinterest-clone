import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardsData from '../../helpers/data/boardsData';
import boardCardsBuilder from '../boardCardsBuilder/boardCardsBuilder';

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
    })
    .catch((err) => console.error('could not get boards', err));
};

export default { printBoards };
