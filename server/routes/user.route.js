const userController = require ('../controllers/user.controller')

module.exports = (app) => {
    app.post('/register',userController.register)
    app.post('/login',userController.login)
    app.post('/logout',userController.logout)
    app.get('/getLoggedUser',userController.getLoggedUser)
}