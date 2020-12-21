const { Schema } = require("mongoose");
const mongoose = require("mongoose");


var cartSchema = new Schema(
  {
    items: [{
      type: Schema.Types.ObjectId,
      ref: "CartItem",
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);