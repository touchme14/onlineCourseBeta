// controllers/authController.js
const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Pastikan path ini benar!

const authController = Router();

authController.get('/register', (req, res) => {
  console.log("\n--- GET /register ---");
  console.log("GET /register - req.session:", req.session);
  console.log("GET /register - res.locals.csrfToken:", res.locals.csrfToken);
  console.log("GET /register - req.cookies:", req.cookies);
  res.render('pages/register', { error: null });
  console.log("--- GET /register (End) ---");
});

authController.post('/register', async (req, res) => {
  console.log("\n--- POST /register ---");
  console.log("POST /register - req.session:", req.session);
  console.log("POST /register - req.body:", req.body);

  try {
    const { full_name, email, password, nidn_number, phone_number, position } = req.body;

    // --- Validasi (Tambahkan validasi yang lebih kuat di sini!) ---
    if (!full_name || !email || !password) {
      console.log("POST /register - Validation failed: missing fields");
      return res.render('pages/register', { error: 'Semua kolom yang wajib harus diisi.' });
    }

    // --- Cek Email Duplikat ---
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      console.log("POST /register - Validation failed: email exists");
      return res.render('pages/register', { error: 'Email sudah terdaftar.' });
    }

    // --- Hash Password ---
    console.log("POST /register - Before bcrypt.hash");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("POST /register - After bcrypt.hash, hashedPassword:", hashedPassword);

    // --- Buat User Baru ---
    console.log("POST /register - Before User.create");
    const newUser = await User.create({
      full_name,  // Sama dengan full_name: full_name,
      email,       // Sama dengan email: email,
      password: hashedPassword, 
      nidn_number,
      phone_number,
      position,
      
    });
    console.log("POST /register - After User.create, newUser:", newUser.toJSON());

    // --- Redirect ke Halaman Login ---
    res.redirect('/login');

  } catch (error) {
    console.error("13. ERROR in POST /register:", error);

    // --- Penanganan Error Sequelize yang Lebih Baik ---
    if (error.name === 'SequelizeValidationError') {
      console.error("    Validation errors:", error.errors);
      const errorMessages = error.errors.map(e => e.message).join('; ');
      return res.render('pages/register', { error: `Validasi gagal: ${errorMessages}` });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      console.error("    Unique constraint error:", error.errors);
      return res.render('pages/register', { error: 'Email sudah terdaftar.' }); // Pesan yang lebih spesifik
    } else {
      // Error lainnya
      return res.status(500).send('Terjadi kesalahan saat mendaftar.');
    }
  }
  console.log("--- POST /register (End) ---");
});

// --- Route Login dan Logout ---
authController.get('/login', (req, res) => {
    console.log("\n--- GET /login ---");
    console.log("GET /login - req.session:", req.session);
    console.log("GET /login - res.locals.csrfToken:", res.locals.csrfToken);
    console.log("GET /login - req.cookies:", req.cookies); // Tambahkan ini!
    try {
      res.render('pages/login', { error: null });
    } catch (error) {
      console.error("Error rendering login page:", error); // Tangani error rendering
      res.status(500).send('Terjadi kesalahan.');
    }
    console.log("--- GET /login (End) ---");
  });
  
  authController.post('/login', async (req, res) => {
    console.log("\n--- POST /login ---");
    console.log("POST /login - req.session:", req.session);
    console.log("POST /login - req.body:", req.body);
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        console.log("POST /login - Validation failed: missing fields");
        return res.render('pages/login', { error: 'Semua kolom harus diisi.' });
      }
  
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        console.log("POST /login - User not found");
        return res.render('pages/login', { error: 'Email atau password salah.' });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("POST /login - Password mismatch");
        return res.render('pages/login', { error: 'Email atau password salah.' });
      }
  
      req.session.user = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      };
      console.log("POST /login - Login successful, session:", req.session);
      res.redirect('/'); // Redirect setelah login berhasil
  
    } catch (error) {
      console.error("Error during login:", error);
       if (error.name === 'SequelizeValidationError') {
            console.error("Validation errors:", error.errors); // Cetak detail validasi
            return res.render('pages/login', { error: 'Data yang Anda masukkan tidak valid.' });
          }
          if (error.name === "SequelizeUniqueConstraintError"){
              console.error('Validation Unique:', error.errors)
               return res.render('pages/login', {error: 'Email sudah terdaftar'})
          }
      res.status(500).send('Terjadi kesalahan saat login.');
    }
    console.log("--- POST /login (End) ---");
  });
  
   authController.get('/logout', (req,res) => {
       req.session.destroy((err) => {
           if(err){
               console.error('error logout', err);
               res.status(500).send('Terjadi Kesalahan saat logout')
           } else {
               res.redirect('/login')
           }
       });
   });

module.exports = authController;