const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/muber_test', { useMongoClient: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', () => { console.warn('Warning', error)} );
});

beforeEach(done => {
    const { drivers } = mongoose.connection.collections;

    drivers.drop()
        // makes sure before any test in ran that an index is present
        // it will recreate the index
        .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
        .then(() => done())
        // the very first time drivers.drop() is ran
        // we won't have a collection to drop so we add a catch
        .catch(() => done());
})