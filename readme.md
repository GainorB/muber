# mUber

An application emulating Uber's core functionality of creating drivers with specified coordinates and using those coordinates to find users within a certain distance.

### TECH STACK
1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. Mocha

### WHAT I LEARNED
1. Further practice with Mocha testing suite: NPM Module "supertest" allows me to make fake HTTP requests to test API endpoints
2. Made two databases for seperate development environments
3. Understanding of coordinates and geometry with MongoDB using a 2dsphere
4. New design pattern for Node.js applications
5. When using Mocha to test the coordinates of a new driver, because the DB is being drop before each test, the index will be erased and throw an error. To fix: in the beforeEach, you need to ensure an Index, by forcefully creating one.
6. More practice with nesting documents with MongoDB
7. Error handler middleware

### CODE SAMPLE
This sample shows retreival of lng and lat coordinates using query parameters then doing a query search with those points. Express assumes the paramaters are strings, so I needed to parse them using parseFloat. Spherical is set to true, since in the PointSchema I chose to model a 2dsphere instead of 2d (flat surface). 2dsphere's are more representational of how to model points and calculate distances on Earth vs. a 2d model which is flat and can give inaccurate distance calculation.

```javascript
const { lng, lat } = req.query;

Driver.geoNear(
    { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        // 200000 'meters'
    { spherical: true, maxDistance: 200000 }
)
```