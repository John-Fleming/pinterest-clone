import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (myUid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${myUid}"`)
    .then((response) => {
      const allBoardsData = response.data;
      const myBoards = [];
      Object.keys(allBoardsData).forEach((board) => {
        allBoardsData[board].id = board;
        myBoards.push(allBoardsData[board]);
      });
      resolve(myBoards);
    })
    .catch((err) => reject(err));
});

export default { getBoardsByUid };
