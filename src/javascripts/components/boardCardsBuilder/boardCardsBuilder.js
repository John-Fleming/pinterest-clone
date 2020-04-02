const buildBoardCards = (boards) => {
  let domString = '';
  domString += '<div class="col-lg-3 col-md-6">';
  domString += `<div class="card text-center board-card" id="${boards.id}">`;
  domString += '  <div class="card-header">';
  domString += `    <h5 class="card-title"><strong>${boards.name}</strong></h5>`;
  domString += '  </div>';
  domString += '  <div class="card-body">';
  domString += `    <p class="card-text">${boards.description}</p>`;
  domString += '    <button class="btn btn-outline-primary view-board-btn"><i class="fas fa-eye"></i></button>';
  domString += '    <button class="btn btn-outline-danger delete-board-btn"><i class="fas fa-times"></i></button>';
  domString += '  </div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildBoardCards };
