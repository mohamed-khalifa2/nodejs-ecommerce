const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required!'],
        unique: [true, 'Category name must be unique!'],
        minlength:3,
        maxlength:30,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String

 },
 {timestamps: true} 
);
 //create model 
 const CategoryModel = mongoose.model('Category', CategorySchema);

 module.exports = CategoryModel;