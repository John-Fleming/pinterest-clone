import firebase from 'firebase/app';
import 'firebase/auth';
import home from '../../components/home/home';
import boards from '../../components/boards/boards';
import singleBoard from '../../components/singleBoard/singleBoard';


const authDiv = $('#auth');
const pageHeaderDiv = $('#page-header');
const boardsDiv = $('#boards-container');
const pinsDiv = $('#single-board-container');
const logoutButton = $('#nav-logout-btn');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      pageHeaderDiv.addClass('hide');
      pinsDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      boards.printBoards();
      singleBoard.pinsEvents();
    } else {
      authDiv.removeClass('hide');
      pageHeaderDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutButton.addClass('hide');
      home.printHomeHeader();
    }
  });
};

export default { checkLoginStatus };
