const mongoose = require('mongoose')
const slugify = require('slugify')


const BookSchema = new mongoose.Schema({
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
    },

    slug: String
}, {
    timestamps: true
})

BookSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {
        lower:true
    })
    console.log(this)
    next()
})


const Book = mongoose.model('Book', BookSchema)


module.exports = Book
