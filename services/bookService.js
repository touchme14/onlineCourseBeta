const BookRepository = require('../repository/bookRepository')

const BookRepo = new BookRepository


exports.getDetailById = async (id) => {
    const bookDetail = await BookRepo.getDetailById(id);
    return bookDetail
}