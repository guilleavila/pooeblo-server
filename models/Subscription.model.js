const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subscriptionSchema = new Schema(
  {
    coRenter: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    house: {
      type: Schema.Types.ObjectId,
      ref: 'House'
    },
    totalPrice: {
      type: Number
    },
    totalDays: {
      type: Number
    },
    daysLeftToBook: {
      type: Number
    }
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema)
Subscription.syncIndexes()
module.exports = Subscription