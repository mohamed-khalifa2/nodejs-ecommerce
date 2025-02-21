const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utilities/ApiError');
const brandModel = require('../models/brands_model');



exports.getBrands = asyncHandler(async(req,res)=>{
    const  page = req.query.page*1 || 1;
    const limit = req.query.limit*1 || 5;
    const skip = (page-1)*limit;

    const brands = await brandModel.find({}).skip(skip).limit(limit);
    res.status(201).json({results: brands.length, page, data:brands});
});

exports.getBrand = asyncHandler(async(req,res,next) => {
    const {id} = req.params
    const brand = await brandModel.findById(id);
    if (!brand) {
        next(new ApiError("couldn't find this brand!", 404));
    }else{
        res.status(200).json({data:brand});
    }
});

exports.createBrand = asyncHandler(async(req,res,next) =>{
    const {name} = req.body;
    const Brand = await brandModel.create({name, slug: slugify(name)});
    res.status(200).json({data: Brand});
});

exports.UpdateBrand = asyncHandler(async (req,res,next)=> {
    const {name} = req.body;
    const {id} = req.params;
    const brand = await brandModel.findByIdAndUpdate({_id:id},{name, slug: slugify(name)},{new:true});
    if (!brand) {
        next(new ApiError(`no brand with this id`, 404));
    }else{
        res.status(200).json({data:brand});
    }
});


exports.DeleteBrand = asyncHandler(async (req,res,next)=> {
    const {id} = req.params;
    const brand = await brandModel.findByIdAndDelete(id);
    if (!brand) {
        next(new ApiError(`no brand with this id`, 404));
    }else{
        res.status(200).send();
    }
});
