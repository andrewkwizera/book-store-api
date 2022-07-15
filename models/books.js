const {Schema, model} = require('mongoose')

const BookSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'book name must be provided']
    }, 

    author: {
        type: String, 
        required: [true, 'author name must be provided']
    }, 

    ISBN: {
        type:String,
        length: 13,
        required: true
    }, 

    category: {
        type: String 
    }

})


Book = model('book', BookSchema)

module.exports = Book
