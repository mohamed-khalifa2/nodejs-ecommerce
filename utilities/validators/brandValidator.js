const { check } = require('express-validator');
const validationMiddleware = require ('../../middlewares/validationMiddleware');

exports.getBrandValidator = [
    check('id').isMongoId().withMessage('invalid Brand format!'),
    validationMiddleware
];

exports.createBrandValidator = [
    check('name').notEmpty().withMessage('Brand required!').isLength({min: 3}).withMessage(`Too short Brand name!`).isLength({max:32}).withMessage(`too long Brand name!`),
    validationMiddleware
];

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('invalid Brand format!'),
    validationMiddleware
];

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('invalid Brand format!'),
    validationMiddleware
];