const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "brand name is requires!"],
        unique: [true, "brand name must be unique!"],
        minlength: 2,
        maxlength: 32,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,

},
{timestamps:true}
);

const brandModel = mongoose.model('brandModel', brandSchema);
module.exports = brandModel;