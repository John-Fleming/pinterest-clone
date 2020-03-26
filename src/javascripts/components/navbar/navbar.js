import firebase from 'firebase/app';
import 'firebase/auth';

const logoutEvent = () => {
  $('#nav-logout-btn').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};

export default { logoutEvent };
