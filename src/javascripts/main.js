import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import auth from './components/auth/auth';
import navbar from './components/navbar/navbar';
import singleBoard from './components/singleBoard/singleBoard';
import newBoardComponent from './components/newBoard/newBoard';
import 'bootstrap';
import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  navbar.logoutEvent();
  $('body').on('mouseenter', '.pins-card', singleBoard.showPinBtns);
  $('body').on('mouseleave', '.pins-card', singleBoard.hidePinBtns);
  $('body').on('click', '#create-board-btn', newBoardComponent.createNewBoard);
};

init();
