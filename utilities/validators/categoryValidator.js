const { check } = require('express-validator');
const validationMiddleware = require ('../../middlewares/validationMiddleware');


exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category format!'),
    validationMiddleware
];

exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('category required!').isLength({min: 3}).withMessage(`Too short category name!`).isLength({max:32}).withMessage(`too long category name!`),
    validationMiddleware
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category format!'),
    validationMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category format!'),
    validationMiddleware
];