const app = require('./app');




const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, ()=>{
    console.log(`app is listening to port ${PORT}`);
});


process.on('unhandledRejection', (err)=>{
    console.error(`unhandled rejection: ${err.name} | ${err.message}`);
    server.close(()=>{
        console.error(`Shutting server!`);
        process.exit(1);
    });
});


// look up src folder