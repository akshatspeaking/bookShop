var mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://admin:bookshopadmin@cluster0.e8e0n.mongodb.net/bookshop?retryWrites=true&w=majority`,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Mongo Error", err);
  });

module.exports = mongoose;
