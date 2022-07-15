const express = require('express')
const {createBook, getBooks, getOneBook, updateBook, deleteBook} = require('../controllers/books')

const router = express.Router()


router.route('/:id').get(getOneBook).patch(updateBook).delete(deleteBook)
router.route('/').get(getBooks).post(createBook)



module.exports = router
