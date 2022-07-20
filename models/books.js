const mongoose = require('mongoose')
const slugify = require('slugify')


const BookSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'book name must be provided']
    }, 

    author: {
        type: [String], 
        required: [true, 'author name must be provided']
    }, 

    isbn: {
        type:String,
        required: true
    }, 

    category: {
        type: [String]
    },

    copies: {
        type: Number,
        default: 1
    }, 

    edition: {
        type: Number,
        default: 1
    },
    
    publisher: {
        type: String
    },

    metadata: {
        type: mongoose.Schema.Types.Mixed
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
