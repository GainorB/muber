const DriversController = require('../controllers/drivers_controllers')

module.exports = (app) => {
    // Request Handlers listen to incoming HTTP requests
    // watch for incoming requests of method GET to the route http://localhost:3050/api
    // pass a reference to the function
    app.get('/api', DriversController.greeting);

    app.post('/api/drivers', DriversController.create);
    app.put('/api/drivers/:id', DriversController.edit);
    app.delete('/api/drivers/:id', DriversController.delete);
    app.get('/api/drivers', DriversController.index);
}