const buildPinCards = (pins) => {
  let domString = '';
  domString += '<div class="col-lg-3 col-md-6">';
  domString += `<div class="card text-cente pins-card" id="${pins.id}">`;
  domString += '  <div class="card-body">';
  domString += `    <img src="${pins.imageUrl}" class="card-img-top img-fluid pins-photo"></img>`;
  domString += '  </div>';
  domString += '</div>';
  domString += '</div>';
  return domString;
};

export default { buildPinCards };
