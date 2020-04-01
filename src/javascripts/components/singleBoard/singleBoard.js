import pinsData from '../../helpers/data/pinsData';
import pinsCardBuilder from '../pinsCardBuilder/pinsCardBuilder';
import utils from '../../helpers/utils';

const boardsDiv = $('#boards-container');
const pinsDiv = $('#single-board-container');

const exitPinsViewEvent = () => {
  boardsDiv.removeClass('hide');
  pinsDiv.addClass('hide');
};

const showPinDeleteBtn = (e) => {
  const pinContent = e.target;
  $(pinContent).find('.delete-pin-btn').removeClass('hide');
  $(pinContent).find('.pins-photo').addClass('darken-img');
};

const hidePinDeleteBtn = (e) => {
  const pinContent = e.target;
  $(pinContent).find('.delete-pin-btn').addClass('hide');
  $(pinContent).find('.pins-photo').removeClass('darken-img');
};

const displaySingleBoard = (e) => {
  const selectedBoardId = e.target.closest('.card').id;
  pinsData.getPinsByBoardId(selectedBoardId)
    .then((pins) => {
      let domString = '';
      domString += '<h1 class="text-center my-3">Pins</h1>';
      domString += '<button id="exit-pins-view" class="btn mr-3"><i class="fas fa-undo fa-2x"></i></button>';
      domString += '<div class="d-flex flex-wrap justify-content-center">';
      pins.forEach((pin) => {
        domString += pinsCardBuilder.buildPinCards(pin);
      });
      domString += '</div">';
      utils.printToDom('single-board-container', domString);
      pinsDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      $('#exit-pins-view').click(exitPinsViewEvent);
    })
    .catch((err) => console.error('get pins by boardId broke', err));
};

export default { displaySingleBoard, showPinDeleteBtn, hidePinDeleteBtn };
