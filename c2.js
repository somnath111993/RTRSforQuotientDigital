let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    Name: { type: String },
    Location: { type: String },    
    Comments: {type: String}     
});
let review = mongoose.model('reviews', reviewSchema, 'reviews');

module.exports = review;