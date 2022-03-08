const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    subscription: {
      type: Schema.Types.ObjectId,
      ref: 'Subscription'
    },
    entryDate: {
      type: Date
    },
    exitDate: {
      type: Date
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Booking", bookingSchema);