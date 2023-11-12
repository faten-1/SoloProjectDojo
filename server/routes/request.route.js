const RequestController = require('../controllers/request.controller')

module.exports = (app) => {
    app.get("/api/requests", RequestController.findAllRequests)
    app.post("/api/requests", RequestController.createNewRequest)
    app.get("/api/requests/:id", RequestController.findOneRequest)
    app.delete("/api/requests/:id", RequestController.deleteOneRequest)
    app.put("/api/requests/:id", RequestController.updateRequest)
}