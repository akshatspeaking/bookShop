var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    books: [{
      type: Schema.Types.ObjectId,
      ref: "Book"
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
