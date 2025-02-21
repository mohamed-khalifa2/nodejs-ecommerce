const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'product name is required!'],
        unique: [true, 'product name must be unique!'],
        minlength: 2,
        maxlength: 32,
    },
    slug: {
        type: String,
        required:true,
        lowercase: true
    },

    description: {
        type: String,
        required: [true, 'product description is required!'],
        unique: [true, 'product description must be unique!'],
        minlength: 20,
        maxlength: 200,
    },
    quantity: {
        type: Number,
        required: [true, 'product quantity is required!'],
    },
    price: {
        type: Number,
        required: [true, 'product price is required!'],
    },

    sold: { type: Number, default: 0 },
    images: [String],
    coverImage: {
        type: String,
        required: [true, 'product cover image is required!'],
    },
    colors: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'product must belong to a category'],
    },
    subCategory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
        required: [true, 'product must belong to a subcategory'],
    }],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'brandModel',
        required: [true, 'product must belong to a brand'],
    },
    ratingAverage: {
        type: Number,
        min: 1,
        max:5,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    }
}, 
{
    timestamps: true,
});


module.exports = mongoose.model('Product', productSchema);