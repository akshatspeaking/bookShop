const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const { NotExtended } = require("http-errors");


module.exports = {
  buyBook: (req, res, next) => {},
  addToCart: async (req, res, next) => {
    try {
      let cart = await Cart.findOne({user: req.user.id});
      let item = await CartItem.create({cart: cart.id, rate: req.body.rate, qty: req.body.qty, total: req.body.rate * req.body.qty, book: req.params.id});
      let updatedCart = await Cart.findByIdAndUpdate(cart.id, { $push: { items: item.id } });
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
  removeFromCart: (req, res) => {},
  editCart: (req, res) => {},
  checkout: (req, res) => {},
};
