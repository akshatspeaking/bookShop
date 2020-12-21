var express = require("express");
var router = express.Router();
var adminController = require("../controllers/bookController");
var path = require("path");
const bookController = require("../controllers/bookController");
const cartController = require("../controllers/cartController");


// router.post("/add", bookController.addBook);
router.get("/:id", bookController.viewBookDetails);
router.post("/:id/addtocart", cartController.addToCart);
router.post("/:id/reviews", bookController.addReview);


module.exports = router;