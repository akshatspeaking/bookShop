var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Cart = require("./Cart");

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.gmailid,
    pass: process.env.gmailpass,
  },
});

var userSchema = new Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false, 
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already registered"],
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    password: {
      // required: [true, "Please include a password"],
      type: String,
      minlength: [6, "Password must be at least 6 chars long"],
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);


// User methods

// pre-save: 
// 1. hash pwd &  
// 2. send registration email with verification link
// 3. create cart for user

userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  if (this.isVerified == false) {
    console.log(this);
    let hashed = jwt.sign(this.id, process.env.secret);
    this.verificationLink = `http://localhost:3001/users/verify/${hashed}`;
      // send link in email via nodemailer
  
      const nodemailer = require("nodemailer");
  
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.gmailid,
          pass: process.env.gmailpass,
        },
      });
      
      let mailOptions = {
        from: process.env.gmailid,
        to: this.email,
        subject: "Verify Your Email for BookStoreApp",
        text: `Click this link to verify your email: ${this.verificationLink}`,
      };
      
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("DONE");
        }
      });
    }
    let myCart = await Cart.create({user : this.id})
    this.cart = myCart.id;
    console.log(this.cart);
    next();
});

userSchema.methods.sendVerificationMail = () => {
  console.log(this);
  let hashed = bcrypt.hashSync(this.id, 10);
  this.verificationLink = `http://localhost:3001/users/verify/${hashed}`;
    // send link in email via nodemailer

    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.gmailid,
        pass: process.env.gmailpass,
      },
    });
    
    let mailOptions = {
      from: process.env.gmailid,
      to: this.email,
      subject: "Verify Your Email for BookStoreApp",
      text: `Click this link to verify your email: ${this.verificationLink}`,
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("DONE");
      }
    });
}

// verifyPassword
userSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compareSync(plain, this.password);
}

// verifyEmail - set isVerified to true and send confirmation mail
module.exports = mongoose.model("User", userSchema);
