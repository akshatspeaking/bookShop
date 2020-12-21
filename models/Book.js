var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: [true, "Book already added"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    description: {
      type: String,
    },
    bookimage: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: "Review"
    }],
    rating: {
      type: Number,
      default: "0"
    },
    categories: [{
      type: Schema.Types.ObjectId,
      ref: "Category"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
