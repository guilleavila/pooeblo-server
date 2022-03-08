const mongoose = require('mongoose')
const Schema = mongoose.Schema

const houseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Indica el nombre de la casa'],
      trim: true
    },
    description: {
      type: String
    },
    priceDay: {
      type: Number
    },
    services: {
      type: String
    },
    roomsDescription: {
      type: String
    },
    maxGuests: {
      type: Number,
    },
    images: {
      type: [String]
    },
    availableDaysLeft: {
      type: Number,
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number]
    },
    village: {
      type: Schema.Types.ObjectId,
      ref: 'Village'
    },
    street: {
      type: String,
      required: [true, 'Indica la dirección']
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);


const House = mongoose.model('House', houseSchema)
House.syncIndexes()
module.exports = House