const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/category_model');
const ApiError = require ('../utilities/ApiError');




// @desc get all categories
// @route GET /api/v1/categories
// @access Public
exports.getCategories = asyncHandler( async(req,res)=>{ // using async await and express async handler
    const page = req.query.page*1 || 1; // pagination handling
    const limit = req.query.limit*1;
    const skip = (page -1)*limit;

    const categories =await CategoryModel.find({}).skip(skip).limit(limit); 
    res.status(200).json({results: categories.length , page , data: categories});
});


// @desc get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
        next(new ApiError(`there's no category with this ID: ${id}`, 404));
        // res.status(404).json({ msg: `no category with this ID ${id}`});
    }else{
        res.status(200).json({data: category});
    }
  
});

// @desc create category
// @route POST /api/v1/categories
// @access private
exports.createCategory = asyncHandler(async(req,res)=> {
    const {name} = req.body;
    const category = await CategoryModel.create({name, slug:slugify(name)});
    res.status(201).json({data: category});
    
});

// @desc update specific category by id
// @route PUT /api/v1/categories/:id
// @access Private

exports.updateCategory = asyncHandler(async (req, res,next)=> {
    const {id} = req.params;
    const {name} = req.body;

    const category = await CategoryModel.findByIdAndUpdate({_id:id},{name, slug:slugify(name)}, {new:true});

    if (!category) {
       return next(new ApiError(`there's no category with this ID: ${id}`, 404));
    }
        res.status(200).json({data: category});
    
});


// @desc Delete specific category by id
// @route DELETE /api/v1/categories/:id
// @access Private

exports.deleteCategory = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    
    if (!category) {
        return next(new ApiError(`there's no category with this ID: ${id}`, 404));
    }
        res.status(204).send();

})