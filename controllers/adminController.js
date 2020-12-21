const User = require("../models/User");
const Order = require("../models/Order");
const Book = require("../models/Book");
const Author = require("../models/Author");
const Category = require("../models/Category");



module.exports = {
  renderAdminPanel: async (req, res, next) => {
    try {
      
    if (req.user.isAdmin) {
      let data = await Promise.all([
        User.find(),
        Order.find(),
        Book.find().populate("author").exec(),
        Author.find(),
        Category.find(),
      ]);
      res.render("admin", {data})
      
    } else {
      req.flash("error", "Unauthorized. Please Login as Admin to perform this action");
      res.redirect("/users/login")
    }
    } catch (error) {
      next(error);
    }
  },

  addAdmin: (req, res) => {},
  removeAdmin: (req, res) => {},
  blockUser: (req, res) => {},
  unblockUser: (req, res) => {},
  viewBlockedUsers: (req, res) => {},
  viewAllUsers: (req, res) => {},
  addCategory: async (req, res, next) => {
    try {
      let obj = await Category.create(req.body);
      res.redirect("/admin")
    } catch (error) {
      next(error);
    }
  },
  editCategory: async (req, res, next) => {
    try {
      let obj = await Category.findByIdAndUpdate(req.body.id, {name: req.body.name})
      res.json(obj);
    } catch (error) {
      next(error);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      let obj = await Category.findByIdAndDelete(req.params.id);
      res.redirect("/admin")
    } catch (error) {
      next(error);
    }
  },
  editFeatured: (req, res) => {},
  deleteFeatured: (req, res) => {},
  addFeatured: (req, res) => {},
  viewAllOrders: (req, res) => {},
  addAuthor: async (req, res, next) => {
    try {
      console.log(req.body);
      let obj = await Author.create(req.body);
      res.redirect("/admin")
    } catch (error) {
      next(error);
    }
  },
  editAuthorForm: (req, res, next) => {
    Author.findById(req.params.id).then(author => {
      res.render("editauthor", {author});
    }).catch(err => {
      next(err);
    })
  },

  editAuthor: (req, res, next) => {
    if (req.file) {
      req.body.authorimage = req.file.filename;
    }
    Author.findByIdAndUpdate(req.params.id, req.body).then(auth => {
      console.log(auth);
      res.redirect("/admin")
    }).catch(err => next(err));
  },
  deleteAuthor: async (req, res, next) => {
    try {
      console.log(req.body);
      let obj = await Author.findByIdAndDelete(req.body.id);
      res.redirect("/admin")
    } catch (error) {
      next(error);
    }
  },
  addBook: async (req, res, next) => {
    try {
      let bookObj = {
        bookimage: req.file.filename,
        author: req.body.author,
        description: req.body.description,
        title: req.body.title,
        price: req.body.price,
        categories: req.body.categories || null,
      }
      let obj = await Book.create(bookObj);
      console.log(obj);
      res.redirect("/admin")
    } catch (error) {
      next(error);
    }
  },
  editBook: (req, res) => {
    if (req.file) {
      req.body.bookimage = req.file.filename;
    }
    Book.findByIdAndUpdate(req.params.id, req.body).then(data => {
      res.redirect("/admin");
    })
  },
  editBookForm: (req, res, next) => {
    Promise.all([
      Book.findById(req.params.id).populate("author").exec(),
      Author.find(),
      Category.find(),
    ]).then(data => {
      res.render("editbook", {data});
    }).catch(err => {
      next(err);
    })
  },
  deleteBook: async (req, res, next) => {
    try {
      console.log(req.body);
      let obj = await Book.findByIdAndDelete(req.body.id);
      res.redirect("/admin")
    } catch (error) {
      next(error);
    }
  },
};
