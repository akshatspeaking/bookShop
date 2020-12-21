var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var authorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "Author already added"],
    },
    description: {
      type: String,
    },
    authorimage: {
      type: String,
    },
    books: [{
      type: Schema.Types.ObjectId,
      ref: "Book"
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
