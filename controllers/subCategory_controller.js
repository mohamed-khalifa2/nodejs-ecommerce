const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategoryModel = require('../models/subCategory_model');
const ApiError = require ('../utilities/ApiError');




// nested routes
// GET /api/v1/categories/:categoryID/subcategories

exports.createFilterObj = (req,res,next) => {
    let filterObj = {};
    if(req.params.categoryID) filterObj = {category: req.params.categoryID};
    req.filterObj = filterObj;
    next();
};



// @desc get all subcategories
// @route GET /api/v1/subcategories
// @access Public
exports.getSubCategories = asyncHandler( async(req,res)=>{ // using async await and express async handler
    const page = req.query.page*1 || 1; // pagination handling
    const limit = req.query.limit*1;
    const skip = (page -1)*limit;

    const subcategories =await SubCategoryModel.find(req.filterObj).skip(skip).limit(limit); 
    res.status(200).json({results: subcategories.length , page , data: subcategories});
});



// @desc get specific subcategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const subcategory = await SubCategoryModel.findById(id);
    if (!subcategory) {
        next(new ApiError(`there's no subcategory with this ID: ${id}`, 404));
        // res.status(404).json({ msg: `no category with this ID ${id}`});
    }else{
        res.status(200).json({data: subcategory});
    }
  
});


exports.getCategoryIdToBody = (req,res,next)=>{
    if(!req.body.category) req.body.category = req.params.categoryID;
    next();
};
// @desc create subcategory
// @route POST /api/v1/subcategories
// @access private
exports.createSubCategory = asyncHandler(async(req,res)=> {
    const {name, category} = req.body;
    const SubCategory = await SubCategoryModel.create({name, slug:slugify(name), category });
    res.status(201).json({data: SubCategory});
    
});

// @desc update specific subcategory by id
// @route PUT /api/v1/subcategories/:id
// @access Private

exports.updateSubCategory = asyncHandler(async (req, res,next)=> {
    const {id} = req.params;
    const {name, category} = req.body;

    const subcategory = await SubCategoryModel.findByIdAndUpdate({_id:id},{name, slug:slugify(name), category}, {new:true});

    if (!subcategory) {
       return next(new ApiError(`there's no subcategory with this ID: ${id}`, 404));
    }
        res.status(200).json({data: subcategory});
    
});


// @desc Delete specific subcategory by id
// @route DELETE /api/v1/subcategories/:id
// @access Private

exports.deleteSubCategory = asyncHandler(async (req,res,next) => {
    const {id} = req.params;
    const subcategory = await SubCategoryModel.findByIdAndDelete(id);
    
    if (!subcategory) {
        return next(new ApiError(`there's no subcategory with this ID: ${id}`, 404));
    }
        res.status(204).send();

});