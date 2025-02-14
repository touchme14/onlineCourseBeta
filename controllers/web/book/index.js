const { Router } = require('express');
const listBook = require('./list');

const bookController = Router()
bookController.use(listBook)

module.exports = bookController
