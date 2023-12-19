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
                    category: {
                        type: String,
                        required: true,
                    },
                    persebaranData: {
                        type: String,
                    },
                    productTerjual: {
                        type: String,
                    },
                    itemsDetail : [
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
                            jumlahData: {
                                type: Number,
                            },
                            jumlahMerk: {
                                type: String, // Array of strings
                            },
                            productTerjual: {
                                type: String,
                            },
                            ketTotalProduct: {
                                type: String,
                            },
                            rangeHarga: {
                                type: String,
                            },
                            rangeJumlahTerjual :{
                                type: String,
                            },
                            topProduct : {
                                type: String,
                            },
                            category: {
                                type: String,
                                required: true,
                            },
                            persebaranData: {
                                type: String,
                            },
                        }
                    ],
                }
            ],
        },
)

module.exports = mongoose.model("product", productSchema)