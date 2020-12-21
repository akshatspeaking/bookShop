const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cart = require("../models/Cart");
require("dotenv").config();

const stripe = require("stripe")(process.env.stripesecret)

module.exports = {
  getLoginPage: (req, res) => {
    let flashmsg = req.flash("error")[0];
    res.render("login", { flashmsg });
  },
  emailLogin: (req, res) => {


    res.redirect("/");

  },
  googleLogin: (req, res) => {

    console.log(req.user);


    if (req.user.email == "akshatspeaking@gmail.com") {
      User.findByIdAndUpdate(req.user.id, {isAdmin: true}).then(user => {
        req.user = user;
        res.locals.user = req.user;
        res.redirect("/admin");
      })
    } else {

      res.locals.user = req.user;
      res.redirect(req.redirectTo);
    }
  },
  registerUser: (req, res, next) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          User.create({
            email: req.body.email,
            password: req.body.password,
          }).then((data) => {
            console.log("User Registered", data);
          req.flash("info", "Successfully registered, please log in");
            res.redirect("/users/login");
          });
        } else if (user) {
          req.flash("error", "Username or Email Already Exists, please log in");
          res.redirect("/users/login");
        }
      })
      .catch((err) => {
        next(err)
        req.flash("error", "Validation Failed. Password must be min 6 characters.");
        res.redirect("/users/login");
      });
  },
  verifyEmail: (req, res) => {
    console.log("HERE");
    if (jwt.verify(req.params.hash, process.env.secret) == req.user.id) {
       User.findByIdAndUpdate(req.user.id, {isVerified: true}).then(user => {
         console.log("EMAIL VERIFIED", user);
         return res.redirect("/");
       }).catch(err => {
        console.log("error here");
        next(err)
        })
     } else {
       console.log("Something went wrong with email verification");
       return res.redirect("/"); 
     }
  },
  viewCart: (req, res) => {
    // check if user not logged in, redirect to login
    Cart.findOne({user: req.user.id}).populate("items").populate({
      path: 'items',
      populate: {
        path: 'book'
        }
    }).exec().then(cart => {
      console.log(cart);
      res.render("cart", {items: cart.items});
    })
  },
  checkoutCart: async (req, res, next) => {
    try {
      
      let cart = await Cart.findOne({user: req.user.id}).populate("items");
      let total = 0;
      cart.items.forEach(item => { total += item.total });
      
      // let session1 = await stripe.checkout.sessions.create();
      console.log("1");
      // console.log(await stripe.checkout.sessions.create(), "HERE");
      const stripe = require("stripe")(process.env.stripesecret);
      // const product = await stripe.products.create({
      //   name: 'Gold Special',
      // });
      // const price = await stripe.prices.create({
      //   unit_amount: total,
      //   currency: 'inr',
      //   product: 'Cart Total',
      // });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Cart Total",
              },
              unit_amount: total*100,
            },
            quantity: cart.items.length,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3001/",
        cancel_url: "http://localhost:3001/users/cart",
      });


      
      // console.log(session);
      return res.json({id: session.id});      
    } catch (error) {
      console.log(error);
      return next(error);
    }
      
      // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: total,
      //   currency: "usd"
      // });
      // let clientSecret = paymentIntent.client_secret;
      // res.json(clientSecret);
    },
  addAddress: (req, res) => {},
  deleteAddress: (req, res) => {},
  editAddress: (req, res) => {},
  viewOrders: (req, res) => {},
  viewWishlist: (req, res) => {},
  logoutUser: (req, res) => {
    req.logout();
    req.session.destroy();
    // res.locals.user = null;
    // req.user = null;
    // console.log(req.user);
    res.redirect("/");
  },
  getHomePage: (req, res) => {
    res.locals.user = req.user ? req.user : null; 
    req.redirectTo = null;
    res.render("index", { title: "Express" });
  },
};
