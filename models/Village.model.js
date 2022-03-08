const mongoose = require('mongoose')
const Schema = mongoose.Schema

const villageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Indica el nombre del pueblo'],
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Indica un email'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Indica tu contraseña']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Indica un número de teléfono']
    },
    CCAA: {
      type: String,
      required: [true, 'Indica una Comunidad Autónoma']
    },
    province: {
      type: String,
      required: [true, 'Indica una provincia']
    },
    profileImg: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
    },
    description: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number]
    },
    features: {
      isCoastalVillage: {
        type: Boolean
      },
      isMountainVillage: {
        type: Boolean
      },
      distanceToCity: {
        type: Number,
        default: 0
      },
      residents: {
        type: Number,
        default: 0
      },
      averageRentingPrice: {
        type: Number,
        default: 0
      },
      averagePurchasePrice: {
        type: Number,
        default: 0
      },
      healthService: {
        type: Boolean,
        default: false
      },
      sportsFacilities: {
        type: Boolean,
        default: false
      },
      otherServices: {
        type: [String]
      }
    }
  },
  {
    timestamps: true,
  }
);

const Village = mongoose.model('Village', villageSchema)
Village.syncIndexes()
module.exports = Village