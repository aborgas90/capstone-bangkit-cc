const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const productSchema = new Schema (
    {
            source: {
                type: String,
                required: true,
            },
            items: [
                {
                    productName: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: String,
                        required: true,
                    },
                    rating: {
                        type: String,
                        required: true,
                    },
                    sell: {
                        type: String,
                        required: true,
                    },
                    location: {
                        type: String,
                        required: true,
                    },
                    shopName: {
                        type: String,
                        required: true,
                    },
                    category: {
                        type: String,
                        required: true,
                    },
                    jumlahData: {
                        type: Number,
                    },
                    jumlahMerk: {
                        type: Number, // Array of strings
                    },
                    productTerjual: {
                        type: String,
                    },
                    persebaranData: {
                        type: String,
                    },
                }
            ],
        },
)

module.exports = mongoose.model("product", productSchema)