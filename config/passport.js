const bcrypt = require('bcrypt')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const User = require('../models/user')


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user.dataValues)
    })
    .catch((error) => done(error))
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: true,
    },
    async (req, username, password, done) => {
      try {
        delete req.body._csrf

        const user = await User.findOne({ where: { username } })
        if (!user) {
          throw Error('Username tidak ditemukan')
        }

        const isPasswordMatch = bcrypt.compareSync(password, user.password)
        if (!isPasswordMatch) {
          throw Error('Password tidak sesuai')
        }

        return done(null, user)
      } catch (error) {
        req.flash('errors', { msg: error.message })
        if (typeof error === 'string' || error instanceof String) {
          return done(error)
        }
        return done(null, false)
      }
    }
  )
)

module.exports = { passport }
