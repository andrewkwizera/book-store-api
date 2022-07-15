const Book = require('../models/books')
const {NOT_FOUND} = require('http-errors')

async function createBook (req, res, next)  {
    try {
        const book = new Book(req.body)
        const newBook = await book.save()
        res.status(201).json({
            success:true, 
            data: newBook
        })
    }catch(e){
        next(e)
    }
}

async function getBooks(req, res, next) {
    try{
        const book = await Book.find()
        res.status(200).json({
            success:true,
            data: book,
            count: book.length
        })
        
    }catch(e){
        next(e)
    }

}

async function getOneBook (req, res, next) {
    try{
        const book = await Book.findById(req.params.id)
        if (!book){
            throw new Error('no book with id found')
        }
        res.status(200).json({
            success: true, 
            data: book
        })
    }catch(e){
        next(e)
    }
}

async function updateBook(req, res, next) {
    try{
       const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body)
       res.status(200).json({
           success:true,
           data: {}
       })

    }catch(e){
        next(e)
    }
}

async function deleteBook(req, res, next) {
    try{
    await Book.findByIdAndDelete(req.params.id)
       res.status(200).json({
           success:true,
           data: {}
       })

    }catch(e){
        next(e)
    }
}




module.exports = {
    createBook,
    getBooks,
    getOneBook,
    updateBook,
    deleteBook
}