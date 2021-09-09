/* eslint-disable no-extra-parens */
/* eslint-disable no-underscore-dangle */

const { lostItemsModel: LostItems } = require('../../models');

const getLostItems = (_, { id, limit, state, offset, description }) => {
  if (id) {
    return new Promise((resolve, reject) => {
      LostItems.findById(id, (err, item) => {
        if (err) {
          reject(err);
        } else {
          resolve([item]);
        }
      });
    });
  } else if (description) {
    return LostItems.find({ description: { $regex: description, $options: 'i' } });
  } else if (offset && limit && state) {
    return LostItems.find({ state })
      .skip(offset)
      .limit(limit);
  } else if (limit && state) {
    return LostItems.find({ state }).limit(limit);
  } else if (state) {
    return LostItems.find({ state });
  } else if (limit) {
    return LostItems.find({}).limit(limit);
  }
  return LostItems.find({});
};

const createLostItem = (_, { lostItem }) => {
  const newLostItem = new LostItems({
    description: lostItem.description,
    state: lostItem.state,
    userInfoStateLost: lostItem.userInfoStateLost,
    userInfoStateDelivered: lostItem.userInfoStateDelivered,
    images: lostItem.images
  });
  newLostItem.id = newLostItem._id;

  return new Promise((resolve, reject) => {
    newLostItem.save(err => {
      if (err) {
        reject(err);
      } else {
        resolve(newLostItem);
      }
    });
  });
};

const updateLostItem = (_, { id, state, userInfoStateDelivered }) =>
  new Promise((resolve, reject) => {
    LostItems.findByIdAndUpdate(
      id,
      { state, ...(state === 'delivered' && { userInfoStateDelivered }) },
      (err, item) => {
        if (err) {
          reject(err);
        }
        if (item) {
          resolve(item);
        }
      }
    );
  });

module.exports = {
  Query: {
    lostItems: getLostItems
  },
  Mutation: {
    createLostItem,
    updateLostItem
  }
};
