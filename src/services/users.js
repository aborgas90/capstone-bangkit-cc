require("dotenv").config();
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const path = require("path");
const nodemailer = require("nodemailer");
const crypto = require("crypto")

const User = require('../models/users')
const Token = require('../models/token')
const Product = require('../models/product')

const { JWT_SECRET } = process.env;
// const usersFilePath = path.join(__dirname, '../databases/db.json');

const authenticate = async ({ id, email, password }) => {
  const user = await User.findOne({ email });

  if( !user ) {
    throw new Error ('User not found') //404
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword)
  // console.log(isPasswordValid,password,user.password)

  if (!isPasswordValid) {
    throw new Error('Incorrect password'); //401
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  });

  return { token };
};

// Save the new user to the database and return an authorization token for the user
const createUser = async ({ email, name, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User ({
      // id: users.length + 1, // Not a robust database incrementor; don't use in production
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate the JWT with jwt.sign. The return value is an
    // authentication token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: 24 * 60 * 60, // Expire tokens after a certain amount of time so users can't stay logged in forever
    });

    // save the new user to our database
    return { token };

  } catch (error) {
    console.log('Error Creating User',error)
    throw error //500
  }
};


const find = async ({ id, email }) => {
  try {
    if( id ){
      const userById = await User.findById(id);
      return userById;
    }else if( email ) {
      const UserByEmail = await User.findOne({ email })
      return UserByEmail
    }else {
      throw new ('Invalid parameters. Specify either id or email')
    }
  } catch (error) {
    console.log(error)
  }
};

const requestPasswordreset = async ({user,passowrdLama, passwordBaru,passwordKonfirmasi}) => {
  // console.log(user, "testsssssss")
  if( passwordBaru !== passwordKonfirmasi ){
    throw new Error('Konfirmasi Password tidak sama') //400
  }

  const isPasswordValid = await bcrypt.compare(passowrdLama, user.password);

  if(!isPasswordValid){
    throw new Error('Passowrd lama tidak sama') //400
  }

  const hashedNewPassword = await bcrypt.hash(passwordBaru, 10);

  user.password = hashedNewPassword

  await user.save();
}


const createProduct = async (productData) => {
  try {
      const product = new Product(productData);
      await product.save();
      return product;
  } catch (error) {
      throw new Error('Product Gagal Dibuat');
  }
};

const getProducts = async () => {
  try {
      const products = await Product.find();
      return products;
  } catch (error) {
      throw new Error('Gagal mendapatkan produk');
  }
};

const searchProductsBySource = async (source) => {
  try {
    const products = await Product.find({ 'product.source': source });
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Error searching products');
  }
};

module.exports = {
  authenticate,
  createUser,
  find,
  requestPasswordreset,
  createProduct,
  getProducts,
  searchProductsBySource,
};