module.exports = mongoose => {
  const lostItemsSchema = new mongoose.Schema({
    description: String,
    state: String,
    userInfoStateLost: String,
    userInfoStateDelivered: String,
    images: Array
  });

  const lostItems = mongoose.model('lostItems', lostItemsSchema);

  return lostItems;
};
