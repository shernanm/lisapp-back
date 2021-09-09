const mongoose = require('../../config/db');
const lostItemsModel = require('./lostItems.js')(mongoose);

module.exports = {
  lostItemsModel
};
