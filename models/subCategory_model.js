const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'subcategory name is required!'],
        unique: [true, 'subcategory name must be unique!'],
        minlength:2,
        maxlength:30,
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'subcategory must belong to main category'],
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
 const SubCategoryModel = mongoose.model('SubCategory', SubCategorySchema);

 module.exports = SubCategoryModel;