const buildPinCards = (pins) => {
  let domString = '';
  domString += '<div class="col-lg-3 col-md-6">';
  domString += `<div class="card pins-card" id="${pins.id}">`;
  domString += '  <div class="card-body pins-content">';
  domString += '    <button class="btn delete-pin-btn hide"><i class="far fa-times-circle fa-3x"></i></button>';
  domString += '    <button class="btn edit-pin-btn hide"><i class="fas fa-edit fa-3x"></i></button>';
  domString += `    <img src="${pins.imageUrl}" class="card-img-top img-fluid pins-photo"></img>`;
  domString += '  </div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildPinCards };
