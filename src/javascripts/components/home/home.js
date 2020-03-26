import utils from '../../helpers/utils';

const printHomeHeader = () => {
  const domString = '<h1 class="text-center mt-3">Pinterest</h1>';
  utils.printToDom('page-header', domString);
};

export default { printHomeHeader };
