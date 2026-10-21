
const { type } = require("express/lib/response")
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: { type: String, require: true },
    price: {type: Number, require: true },
    desc: { type: String },
    image: {type: String, require: true }
})



const Product = mongoose.model( "Product", productSchema )


module.exports = Product