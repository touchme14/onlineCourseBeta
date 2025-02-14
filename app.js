const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const crypto = require('crypto');
const config = require('./config/config'); // Import config
const webRouter = require('./routes/web'); // Import webRouter

const app = express();

// --- Session Middleware ---
const sessionSecret = crypto.randomBytes(64).toString('hex'); // Or from config
console.log("Session Secret:", sessionSecret); // LOG THE SECRET!
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // MUST be false on localhost without HTTPS
      httpOnly: true,
    },
  })
);

// --- Body Parser, CSRF ---
app.use(bodyParser.urlencoded({ extended: false }));
const csrfProtection = csrf({ cookie: false });
app.use(csrfProtection);

// --- Static Files, View Engine ---
app.use('/asset', express.static(path.join(__dirname, 'asset')));
app.use('/assets', express.static(path.join(__dirname, 'views/assets')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// --- CSRF Middleware (EXTREME LOGGING) ---
app.use(function (req, res, next) {
  console.log("\n--- CSRF Middleware ---");
  console.log("1. Request Path:", req.path);
  console.log("2. Request Method:", req.method);
  console.log("3. Request Session ID (before csrfToken()):", req.sessionID);
  console.log("4. Request Cookies (before csrfToken()):", req.cookies);
  let token;
  try {
    token = req.csrfToken();
    console.log("5. CSRF Token Generated:", token);
    res.locals.csrfToken = token;
    console.log("6. res.locals.csrfToken set:", res.locals.csrfToken);
  } catch (error) {
    console.error("7. ERROR in CSRF middleware (req.csrfToken()):", error);
    return res.status(500).send('CSRF Error');
  }
  console.log("--- CSRF Middleware (End) ---");
  next();
});

// --- Use webRouter ---
app.use(webRouter);

// --- Error Handling ---
app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});
// --- Start Server ---
const port = config.port;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});