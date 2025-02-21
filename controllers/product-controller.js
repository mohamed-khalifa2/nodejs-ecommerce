const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const productModel = require('../models/product-model');
const ApiError = require('../utilities/ApiError');


exports.getProducts = asyncHandler(async(req,res) => {
    const {page} = req.query*1 || 1;
    const {limit} = req.query*1 || 5;
    const skip = (page-1)*limit;
    const products = await productModel.find({}).skip(skip).limit(limit);

    res.status(200).json({results: products.length, page:page , data: products});
});

exports.getProduct = asyncHandler(async(req,res)=> {
    const {id} = req.params
    const product = await productModel.findById(id)
    if (!product) {
        return new ApiError("no product with this ID",404)
    }
    res.status(200).json({data: product})
})

exports.updateProduct = asyncHandler(async(req,res)=> {
    const {id} = req.params
    const {name} = req.body
    const product = await productModel.findByIdAndUpdate({_id:id},{name, slug:slugify(name)},{new:true})
    if (!product) {
        return new ApiError("no product with this ID", 404)
    }
    res.status(200).json({data: product})
})

exports.createProduct = asyncHandler(async(req,res) => {
    req.body.slug = slugify(req.body.title)
    const product = await productModel.create(req.body)
    res.status(200).json({data: product})
});

exports.deleteProduct = asyncHandler(async (req,res)=> {
    const {id} = req.params
    const product = await productModel.findByIdAndDelete(id)
    if (!product) {
        return new ApiError('no product with this ID', 404)
    }
    res.status(200).send()
})