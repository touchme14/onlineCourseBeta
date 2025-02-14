const Book = require('../models/book')

class BookRepository {
    async getDetailById(id) {
        return await Book.findByPk(id)
    }
}

module.exports = BookRepository