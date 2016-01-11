/**
 * HouseController
 *
 * @description :: Server-side logic for managing houses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    find: function (req, res) {
        var i = 0, testData = [];
        while(i++<10){
            testData[i] = {
                            name: req.query.search + ' ' + i, type: req.query.type, description: 'test description '+i,
                            coords : {latitude: 21.0285 - Math.random()/100, longitude: 105.8542 + Math.random()/100},
                            price: 100+i, image : 'images/house-icon.png', markerIcon: 'images/marker-icon.png'
            };
        }
        House.findOrCreate(req.query, testData).exec(function createFindCB(err, object){
             if (object === undefined) return res.notFound();

            if (err) return next(err);

            res.json(object);
        });
    }

};

