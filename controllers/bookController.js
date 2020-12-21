const Book = require("../models/Book");
const Cart = require("../models/Cart");
const Review = require("../models/Review");


module.exports = {
  getBookList: (req, res) => {},
  viewBookDetails: async (req, res) => {
    let book = await Book.findById(req.params.id).populate("author").populate("reviews").exec();
    res.render("book", {book});
  },
  addToWishlist: (req, res) => {},
  removeFromWishlist: (req, res) => {},
  addReview: async (req, res, next) => {
    try {
      req.body.book = req.params.id;
      req.body.user = req.user.id;
      let review = await Review.create(req.body);
      let book = await Book.findByIdAndUpdate(req.params.id, {$push: { reviews: review }}).populate("reviews");
      let avg = 0;
      book.reviews.forEach(review => {
        avg += review.rating;
      });
      avg = avg / book.reviews.length;
      let book1 = await Book.findByIdAndUpdate(req.params.id, {rating: avg}); 
      res.redirect(`/book/${book1.id}`);
    } catch (error) {
      next(error)      
    }
  },
  deleteReview: (req, res) => {},
  editReview: (req, res) => {},
  getBookAddPage: (req, res) => {
    res.render("addbook");
  }
};
