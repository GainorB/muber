const Driver = require('../models/driver');

module.exports = {
    greeting(req, res){
        res.send({ hi: 'there' });
    },

    index(req, res, next){

        // reference to query string
        // example query string: ?lng=80&lat=20
        const { lng, lat } = req.query;
        
        Driver.geoNear(
            { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                // 200000 'meters'
            { spherical: true, maxDistance: 200000 }
        )
        .then( drivers => res.send(drivers))
        .catch(next);
    },

    create(req, res, next){
        // represents the properties 
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },

    edit(req, res, next){
        const driverID = req.params.id;
        const driverProps = req.body;

        // downside: the .then isn't called with the updated driver when using findByIdAndUpdate
        Driver.findByIdAndUpdate({ _id: driverID }, driverProps)
            .then(() => Driver.findById({ _id: driverID }))
            .then(driver => res.json(driver))
            .catch(next);
    },

    delete(req, res, next){
        const driverID = req.params.id;

        Driver.findByIdAndRemove({ _id: driverID })
            .then(driver => res.status(204).json({ status: true, removed: driver }))
            .catch(next);
    }

};