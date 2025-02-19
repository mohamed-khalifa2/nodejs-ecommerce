const express = require("express");
const { getCategories, createCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/category_controller");
const categoryValidator = require('../utilities/validators/categoryValidator');
const subCategoryRoute = require('./subCategory_route');


const router = express.Router();

router.use('/:categoryID/subcategories', subCategoryRoute);

router.route('/')
.get(getCategories)
.post(categoryValidator.createCategoryValidator,createCategory);

router.route('/:id')
.get(categoryValidator.getCategoryValidator,getCategory)
.put(categoryValidator.updateCategoryValidator,updateCategory)
.delete(categoryValidator.deleteCategoryValidator,deleteCategory);


module.exports = router;