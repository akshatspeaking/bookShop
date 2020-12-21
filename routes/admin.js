var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");
var path = require("path");

// auth middleware
var authAdmin = require("../config/auth");

var multer = require("multer");
var storageBook = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public/book-images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var uploadBook = multer({ storage: storageBook });

var storageAuthor = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public/author-images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var uploadAuthor = multer({ storage: storageAuthor });


/* GET admin panel. */
router.get("/", authAdmin, adminController.renderAdminPanel);

// Users
router.get("/blockUser/:id", authAdmin, adminController.blockUser);
router.get("/unblockUser/:id", authAdmin, adminController.unblockUser);

//Books
router.post("/addBook", authAdmin,   uploadBook.single("bookimage"),
adminController.addBook);
router.post("/deleteBook", authAdmin, adminController.deleteBook);
router.get("/editBook/:id", authAdmin, adminController.editBookForm);
router.post("/editBook/:id", authAdmin, uploadBook.single("bookimage"), adminController.editBook);





// Authors
router.post("/addauthor", authAdmin,   uploadAuthor.single("authorimage"),
adminController.addAuthor);
router.post("/deleteAuthor", authAdmin, adminController.deleteAuthor);
router.get("/editAuthor/:id", authAdmin, adminController.editAuthorForm);
router.post("/editAuthor/:id", authAdmin, uploadAuthor.single("authorimage"), adminController.editAuthor);




// Categories

router.post("/addcategory", authAdmin, adminController.addCategory);
router.post("/editcategory", authAdmin, adminController.editCategory);

router.get("/deleteCategory/:id", authAdmin, adminController.deleteCategory);



module.exports = router;