// routes/web.js
const { Router } = require('express');
const bookController = require('../controllers/web/book'); // Import bookController
const authController = require('../controllers/authController'); // Import authController

const webRouter = Router();

webRouter.use(authController); // Route untuk autentikasi (register, login)
webRouter.use('/books', bookController); // Route untuk buku (dengan prefix /books)

webRouter.get('/', (req, res) => {
  res.send("Halaman Utama"); // Ganti dengan render view yang sesuai
  // res.render('index'); // Jika ada
});

// webRouter.get('/profile', (req, res) => { // Anda belum punya middleware ensureAuthenticated
//   res.render('profile');
// });

module.exports = webRouter;