const sendForProduction = (res,err) => res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
    });

const sendForDev = (res,err) => res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
        err: err,
        stack: err.stack,

    });



const globalError = (err, req,res,next)=> {
    err.statusCode = err.statusCode || 500;
    err.status = err.status|| 'error';
    if(process.env.NODE_ENV === 'development') {

        sendForDev(res,err);
    }else {
        sendForProduction(res,err);
    }
};





module.exports = globalError;