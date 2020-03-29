const buildBoardCards = (boards) => {
  let domString = '';
  domString += '<div class="col-lg-3 col-md-6">';
  domString += `<div class="card text-center" id="${boards.id}">`;
  domString += '  <div class="card-header">';
  domString += `    <h5 class="card-title"><strong>${boards.name}</strong></h5>`;
  domString += '  </div>';
  domString += '  <div class="card-body">';
  domString += `    <p class="card-text">${boards.description}</p>`;
  domString += '    <button class="btn btn-primary view-board-btn">View Board</button>';
  domString += '  </div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildBoardCards };
