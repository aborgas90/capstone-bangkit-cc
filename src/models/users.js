const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required : true,
            unique: true,
        },
        email: {
            type : String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 3,
            max: 255,
        },
        role : {
            type : String,
            enum: ['user', 'admin'],
            default: 'user',
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model("user", userSchema)