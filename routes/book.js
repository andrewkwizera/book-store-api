const express = require('express')
const {createBook, getBooks} = require('../controllers/book')

const router = express.Router()

router.get('/', getBooks)
