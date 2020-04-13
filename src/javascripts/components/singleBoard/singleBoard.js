import firebase from 'firebase/app';
import 'firebase/auth';
import pinsData from '../../helpers/data/pinsData';
import pinsCardBuilder from '../pinsCardBuilder/pinsCardBuilder';
import utils from '../../helpers/utils';
import boardsData from '../../helpers/data/boardsData';

// FUNCTIONS TO SHOW AND HIDE ELEMENTS

const boardsDiv = $('#boards-container');
const pinsDiv = $('#single-board-container');

// function to return to the all boards view from the single board view
const exitPinsViewEvent = () => {
  boardsDiv.removeClass('hide');
  pinsDiv.addClass('hide');
};

// function to show edit and delete buttons on mouse enter over pin
const showPinBtns = (e) => {
  const pinContent = e.target;
  $(pinContent).find('.delete-pin-btn').removeClass('hide');
  $(pinContent).find('.edit-pin-btn').removeClass('hide');
  $(pinContent).find('.pins-photo').addClass('darken-img');
};

// function to hide edit and delete buttons on mouse exit over pin
const hidePinBtns = (e) => {
  const pinContent = e.target;
  $(pinContent).find('.delete-pin-btn').addClass('hide');
  $(pinContent).find('.edit-pin-btn').addClass('hide');
  $(pinContent).find('.pins-photo').removeClass('darken-img');
};

// function that updates which form fields show on the pin modal
const showPinForm = () => {
  // jQuery to update which form fields show on the pin modal
  $('#create-pin-form-header').removeClass('hide');
  $('#pin-image-input').removeClass('hide');
  $('#create-pin-btn').removeClass('hide');
  $('#edit-pin-form-header').addClass('hide');
  $('#pin-board-location').addClass('hide');
  $('#update-pin-btn').addClass('hide');
};

// function to launch pin modal again and with different fields
const showEditPinForm = (e) => {
  // jQuery to update which form fields show on the pin modal
  $('#edit-pin-form-header').removeClass('hide');
  $('#pin-board-location').removeClass('hide');
  $('#update-pin-btn').removeClass('hide');
  $('#create-pin-form-header').addClass('hide');
  $('#pin-image-input').addClass('hide');
  $('#create-pin-btn').addClass('hide');
  // add selected pin class to the pin card to access for update pin function
  const pinCard = e.target.closest('.card');
  pinCard.classList.add('selected-pin');
};

// FUNCTIONS TO CREATE, UPDATE, AND DELETE PINS

// function that adds a new pin and recalls the GET request to print pins
const createNewPin = () => {
  const selectedBoardId = $('.pins-container').data('boardId');
  const newPinObject = {
    boardId: selectedBoardId,
    imageUrl: $('#pin-image-url').val(),
  };
  pinsData.addPin(newPinObject)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      displaySingleBoard(selectedBoardId);
      $('#new-pin-form').trigger('reset');
    })
    .catch((err) => console.error('could not add a new board', err));
};

// click event that deletes selected pin and recalls the GET request to print pins
const removePin = (e) => {
  const pinId = e.target.closest('.card').id;
  const selectedBoardId = $('.pins-container').data('boardId');
  pinsData.deletePin(pinId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      displaySingleBoard(selectedBoardId);
    })
    .catch((err) => console.error('could not delete pin', err));
};

// function that updates the board a pin belons to and recalls the GET request to print pins
const editPinEvent = () => {
  const selectedPinId = $('.selected-pin').attr('id');
  const myUid = firebase.auth().currentUser.uid;
  boardsData.getBoardsByUid(myUid)
    .then((myBoards) => {
      const newBoard = myBoards.find((x) => x.name === $('#pin-board-name').val());
      pinsData.getSinglePin(selectedPinId)
        .then((resp) => {
          const modifiedPinObject = {
            boardId: newBoard.id,
            imageUrl: resp.data.imageUrl,
          };
          pinsData.editPin(selectedPinId, modifiedPinObject)
            .then(() => {
              // eslint-disable-next-line no-use-before-define
              displaySingleBoard(newBoard.id);
              $('#new-pin-form').trigger('reset');
              $('.selected-pin').removeClass('selected-pin');
            });
        });
    })
    .catch((err) => console.error('could not get board data', err));
};

// click events to create, delete, and update pins and boards, and exit the single board view
const pinsEvents = () => {
  $('body').on('click', '#show-pins-form', showPinForm);
  $('body').on('click', '.edit-pin-btn', showEditPinForm);
  $('body').on('click', '#create-pin-btn', createNewPin);
  $('body').on('click', '.delete-pin-btn', removePin);
  $('body').on('click', '#update-pin-btn', editPinEvent);
  $('body').on('click', '#exit-pins-view', exitPinsViewEvent);
};

// GET request that accesses pins entity and calls printToDOM
const displaySingleBoard = (selectedBoardId) => {
  pinsData.getPinsByBoardId(selectedBoardId)
    .then((pins) => {
      let domString = '';
      domString += '<h1 class="text-center my-3">Pins</h1>';
      domString += '<button id="exit-pins-view" class="btn mr-3"><i class="fas fa-undo fa-2x"></i></button>';
      domString += `<div class="d-flex flex-wrap justify-content-center pins-container" data-board-id=${selectedBoardId}>`;
      domString += '<div class="col-12 text-center">';
      domString += '<button type="button" id="show-pins-form" class="btn btn-light" data-toggle="modal" data-target="#pins-form-modal">';
      domString += '<i class="fas fa-plus"></i></button>';
      domString += '</button>';
      domString += '</div>';
      pins.forEach((pin) => {
        domString += pinsCardBuilder.buildPinCards(pin);
      });
      domString += '</div">';
      utils.printToDom('single-board-container', domString);
      pinsDiv.removeClass('hide');
      boardsDiv.addClass('hide');
    })
    .catch((err) => console.error('get pins by boardId broke', err));
};

// click event when selecting the board to view
const viewBoardEvent = (e) => {
  const selectedBoardId = e.target.closest('.card').id;
  displaySingleBoard(selectedBoardId);
};

export default {
  viewBoardEvent,
  showPinBtns,
  hidePinBtns,
  pinsEvents,
};
