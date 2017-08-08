const assert = require('assert');
const app = require('../app');

// allows you to make fake HTTP requests to test with mocha
// simulates requests to express app
const request = require('supertest');

describe('The Express App', () => {

    // http requests are always async, so past in done callback
    it('Handles a GET request to /api', (done) => {
        // pass in express app
        request(app)
            .get('/api') // specify what type of request and to which route/endpoint
            // err doesn't have to do anything with error status codes
            .end((err, response) => {
                // console.log(response);
                assert(response.body.hi === 'there');
                done();
            });
    });

});