const app = require('./app');

// tells the app to listen to incoming requests on port 3050
app.listen(3050, () => {
    console.log('Running on port 3050');
})