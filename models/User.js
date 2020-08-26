var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already registered"],
    },
    password: {
      required: [true, "Please include a password"],
      type: String,
      minlength: [6, "Password must be at least 6 chars long"],
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

// User methods

// pre-save: hash pwd & send registration email with verification link

// checkPassword
// verifyEmail - set isVerified to true and send confirmation mail
