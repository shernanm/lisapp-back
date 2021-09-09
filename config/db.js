const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb+srv://graphql-user:wHV3PvaCJH8oTKsS@cluster0.nxvup.mongodb.net/LISApp?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

module.exports = mongoose;
