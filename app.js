const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const ApiError = require('./utilities/ApiError');
const globalError = require('./middlewares/ErrorMiddlewares');
const subCategoryRoute = require('./routes/subCategory_route');
const brandRoute = require('./src/brand/brand_route');

const dbConnection = require('./configs/database');
const categoryRoute = require('./routes/category_route');

// connect with database
dbConnection();

// express app
const app = express();



// middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    console.log(`running on ${process.env.NODE_ENV} mode`);
};

app.use(express.json());

    // mount routes
app.use('/api/v1/categories',categoryRoute);
app.use('/api/v1/subcategories',subCategoryRoute);
app.use('/api/v1/brands',brandRoute);


    // handling routes errors
app.all('*', (req,res,next)=>{
    next(new ApiError(`can't find this route`, 400));
});


    //globally handling errors with error middleware
app.use(globalError);


module.exports =app