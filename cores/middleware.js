const cors = require('cors')
const session = require('express-session')
const lusca = require('lusca')
const compression = require('compression')
const { db } = require('../config/database')
const { secret } = require('../config/config')
const config = require('../config/config')
// const { passport } = require('../config/passport')
const PgSession = require('connect-pg-simple')(session);
const pg = require('pg');

const middleware = (express, app) => {
    app.use(cors())
    app.use(compression())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    const {
        host,
        username,
        password,
        database,
        port,
    } = db

    const pool = new pg.Pool({
        user: username,
        host,
        database,
        password,
        port,
    })

    // const sessionStore = new PgSession({
    //     pool,
    //     tableName: 'user_sessions',
    // });
    

    // app.use(session({
    //     resave: true,
    //     saveUninitialized: true,
    //     secret,
    //     cookie: {
    //         maxAge: 1000 * 60 * 60 * 24 * 3,
    //     },
    //     store: sessionStore,
    // }))

    // app.use(passport.initialize())
    // app.use(passport.session())

    // app.use((req, res, next) => {
    //     if (req.path.startsWith('/api')) {
    //         next();
    //     } else if (req.headers['content-type']) {
    //         if (req.headers['content-type'].split(';')[0] === 'multipart/form-data') {
    //             next();
    //         } else {
    //             lusca.csrf()(req, res, next)
    //         }
    //     } else {
    //         lusca.csrf()(req, res, next)
    //     }
    // })
    // app.use(lusca.xframe('SAMEORIGIN'))
    // app.use(lusca.xssProtection(true))

    app.locals.title = config.title
    app.locals.logo = config.logo
}

module.exports = middleware
