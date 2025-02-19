const { check } = require('express-validator');
const validationMiddleware = require ('../../middlewares/validationMiddleware');


exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid subcategory format!'),
    validationMiddleware
];

exports.createSubCategoryValidator = [
    check('name')
    .notEmpty().withMessage('subcategory required!')
    .isLength({min: 2}).withMessage(`Too short subcategory name!`)
    .isLength({max:32}).withMessage(`too long subcategory name!`),
    check('category').notEmpty().withMessage('Subcategory must belong to a category')
    .isMongoId().withMessage('Invalid format'),
    validationMiddleware
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid subcategory format!'),
    validationMiddleware
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid subcategory format!'),
    validationMiddleware
];