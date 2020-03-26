import utils from '../../helpers/utils';

const printAllBoards = () => {
  const domString = '<h1 class="text-center mt-3">Boards</h1>';
  utils.printToDom('boards-container', domString);
};

export default { printAllBoards };
