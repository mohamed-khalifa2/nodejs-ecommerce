const express = require('express');
const {getBrands,createBrand,getBrand,UpdateBrand,DeleteBrand} = require('../controllers/brand_controller');
const {getBrandValidator,createBrandValidator,updateBrandValidator,deleteBrandValidator} = require('../utilities/validators/brandValidator');

const router = express.Router();

router.route('/').get(getBrands).post(createBrandValidator,createBrand);
router.route('/:id').get(getBrandValidator,getBrand).put(updateBrandValidator,UpdateBrand).delete(deleteBrandValidator,DeleteBrand);

module.exports = router;