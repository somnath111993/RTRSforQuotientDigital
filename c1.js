let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let restuarantSchema = new Schema({
    Name: { type: String },
    Location: { type: String },    
    Cuisines: [ {type: String} ],    
    Tables: [
        {   name: {type : String},
            capacity: {type : String},
            status: {type : String}            
            // bookedOn: { type: String}
        }
    ]
});
let restuarant = mongoose.model('restuarants', restuarantSchema, 'restuarants');

module.exports = restuarant;
