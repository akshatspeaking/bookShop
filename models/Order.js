var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var oderSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [{
      type: Schema.Types.ObjectId,
      ref: "CartItem"
    }],
    total: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", oderSchema);
