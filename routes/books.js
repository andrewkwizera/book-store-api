const express = require('express')
const {createBook, getBooks, getOneBook, updateBook, deleteBook} = require('../controllers/books')
const {validateCreateBook} = require('../middlewares/validate')
const router = express.Router()


router.route('/:id').get(getOneBook).patch(updateBook).delete(deleteBook)
router.route('/').get(getBooks).post(validateCreateBook, createBook)



module.exports = router
