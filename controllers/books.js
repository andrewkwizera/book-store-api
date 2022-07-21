const Book = require('../models/books')
const {NotFound, BadRequest} = require('http-errors')
const asyncHandler = require('../middlewares/async')

const createBook = asyncHandler(async (req, res, next) => {
    const book = new Book(req.body)
    const newBook = await book.save()
    
    res.status(201).json({
        success:true, 
        data: newBook
    })
})

async function getAllBooks(req, res, next) {
    try{
        console.log(req.query)
        let query 

        //creates a copy of req.query
        let reqQuery = {...req.query}

        //create a list of fields to exclude from the query
        let excludeFields = ['select', 'sort', 'page', 'limit']

        excludeFields.map(field => delete reqQuery[field])

        //creates query string 
        let queryStr = JSON.stringify(reqQuery)

        //create mongodb operators
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|in)\b/g, match => `$${match}`)
        query = Book.find()

        //selects fieds
        if (req.query.select){
           const fields = req.query.select.split(',').join(' ')
           query = query.select(fields)
        }

        //sorts fields
        if (req.query.sort){
            const sortBy = req.query.sort
            query = query.sort(sortBy)
         }

        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 10
        const startIndex = (page - 1) * limit
        const endIndex =  page * limit 
        const total = await Book.countDocuments()

        query.limit(limit).skip(startIndex)

        const book = await query

        const pagination = {}
        
        if(endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        if(startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        res.status(200).json({
            success:true,
            count: book.length,
            pagination,
            data: book,
            
        })
    }catch(e){
        next(e)
    }

}

async function getOneBook (req, res, next) {
    try{
        if(!req.params.id) {
            throw new BadRequest('no id provided')
        }
        await Book.findOne({_id:req.params.id})
        const book = await Book.findById(req.params.id)
        if (!book){
            throw new NotFound('no book with id found')
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
        if(!req.params.id) {
            throw new BadRequest('id must be provided!')
        }
       const existingBook = await Book.findById(req.params.id)
       if(!existingBook) {
        throw new NotFound('no book with id exist')
       }
       const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true
       })
       res.status(200).json({
           success:true,
           data: book
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
    getAllBooks,
    getOneBook,
    updateBook,
    deleteBook
}