import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinsByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const allPins = response.data;
      const boardPins = [];
      Object.keys(allPins).forEach((pin) => {
        allPins[pin].id = pin;
        boardPins.push(allPins[pin]);
      });
      resolve(boardPins);
    })
    .catch((err) => reject(err));
});

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const addPin = (newPinObject) => axios.post(`${baseUrl}/pins.json`, newPinObject);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const editPin = (pinId, modifiedPinObject) => axios.put(`${baseUrl}/pins/${pinId}.json`, modifiedPinObject);

export default {
  getPinsByBoardId,
  getSinglePin,
  deletePin,
  addPin,
  editPin,
};
