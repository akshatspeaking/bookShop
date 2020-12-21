const { Schema } = require("mongoose");
const mongoose = require("mongoose");

var cartItemSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "book is required"],
    },
    rate: {
      type: Number,
      required: [true, "book price is required"]
    },
    qty: {
      type: Number,
      required: [true, "Qty is required"],
    },
    total: {
      type: Number,
    },
    cart: {
      type: Schema.Types.ObjectId,
      required: [true, "Cart is required"],
      ref: "Cart",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);