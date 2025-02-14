const api = require('../routes/api')
const web = require('../routes/web')

const router = (app) => {
    app.use(api)
    app.use(web)
}

module.exports = router