var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"],
    },
    content: {
      type: String,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
