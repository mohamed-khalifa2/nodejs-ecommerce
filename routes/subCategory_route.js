const express = require("express");
const { createFilterObj,getCategoryIdToBody,createSubCategory, getSubCategories, getSubCategory, deleteSubCategory, updateSubCategory } = require("../controllers/subCategory_controller");
const {createSubCategoryValidator,getSubCategoryValidator, deleteSubCategoryValidator, updateSubCategoryValidator} = require('../utilities/validators/SubCategoryValidator');


const router = express.Router({mergeParams:true}); // to access params in categories



router.route('/')
.get(createFilterObj,getSubCategories)
.post(getCategoryIdToBody,createSubCategoryValidator,createSubCategory);


router.route('/:id')
.get(getSubCategoryValidator,getSubCategory)
.put(updateSubCategoryValidator,updateSubCategory)
.delete(deleteSubCategoryValidator, deleteSubCategory)


module.exports = router;