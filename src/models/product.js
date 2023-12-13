const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const productSchema = new Schema (
    {
        productName: {        
            type: String,
            required : true,
        },
        price: {
            type: String,
            required : true,
        },
        rating: {
            type: String,
            required : true,
        },
        sell: {
            type: String,
            required : true,
        },
        location: {
            type: String,
            required : true,
        },
        shopName: {
            type: String,
            required : true,
        },
        category: {
            type: String,
            required : true,
        }
    },
)

module.exports = mongoose.model("product", productSchema)