const { authenticate, find, createUser, requestPasswordreset, createProduct, getProducts, requestForgotPassword } = require('../services/users');
const User = require('../models/users')
const Token = require('../models/token')
const Product = require('../models/product');


const handleSignup = async(req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await find({ email })
        if(user) {
            return res.status(400).json({ error: 'Email already exists', message: 'Registration failed' }); //400
        }

        const { token } = await createUser({ name, email, password })
        res.status(200).json({ message: 'Registration successful', token });
    } catch (error) {
        next (error)
    }
};

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne( { email } )

        if (!user) {
            return res.status(401).json({ error: 'Unable to login', message: 'Invalid email or password' });
          }

        const { token } = await authenticate ({ email, password});

        res.status(200).json({ message: 'Login successful', email, token });
    } catch (error) {
        next(error)
    }
}

const handlePostDataProduct = async (req, res, next) => {
    try {
        const productData = req.body;

        // Panggil fungsi layanan untuk membuat produk
        const product = await createProduct(productData);
        if(!productData) {
            return res.status(404).json({message: 'Product Kosong'})
        }

        res.status(201).json({ message: 'Product berhasil dibuat', product });
    } catch (error) {
        next(error);
    }
};

  const handleGetProducts = async (req, res, next) => {
    try {
      const products = await getProducts();
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  };


const handleGetAllDataProduct = async (req, res, next) => {
    try {
        Product.find()
            .then((product)=> {
                res.status(200).json({ product })
            })
    } catch (error) {
        next(error);
    }
}

const handleGetDataId = async (req, res, next) => {
    try {
        const productId = req.params.productId;

        // Mengecek apakah productId valid
        if (!productId) {
            return res.status(400).json({ error: 'Invalid product ID', message: 'Invalid request' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found', message: 'Invalid product ID' });
        }

        res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
}

const handleSearchData = async (req, res, next) => {
    try {
        const result = await Product.aggregate([
            {
                '$search' : {
                    'index' : 'nama-search',
                    'text' : {
                        'query' : req.query.source,
                        'path' : {
                            'wildcard' : '*'
                        }
                    }
                }
            }
        ])

        res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};

const handleResetPassword = async (req, res, next) => {
    try {
        const user = req.user
        console.log(user)
        console.log(user.password)
        if (!user) {
            return res.status(400).send({message: "User does not exist"})
        }
        let token = await Token.findOne({ userId: user._id });
        if (token) {
            await token.deleteOne()
        }

        const { passowrdLama, passwordBaru,passwordKonfirmasi } = req.body;
        await requestPasswordreset({user, passowrdLama, passwordBaru,passwordKonfirmasi});

        res.status(200).json({message :'passowrd berhasil diubah'})
    } catch (error) {
        next(error);
    }
}

const handleForgetPassword = async (req, res, next) => {
    try {
        const email  = req.body.email
        console.log("email : " ,email)
        const requestForgotPasswordService = await requestForgotPassword(
            email
        )

        console.log(requestForgotPasswordService)
    
        return res.json(requestForgotPasswordService)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    handleSignup,
    handleLogin,
    handleResetPassword,
    handleForgetPassword,
    handleGetAllDataProduct,
    handlePostDataProduct,
    handleGetProducts,
    handleGetDataId,
    handleSearchData,
}