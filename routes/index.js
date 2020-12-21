var express = require("express");
var router = express.Router();
var Book = require("../models/Book");

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.locals.user = req.user || null; 
  req.redirectTo = "";
  let data = await Book.find().populate("author").exec();
  res.render("index", { title: "Express", data: data });
});

module.exports = router;
