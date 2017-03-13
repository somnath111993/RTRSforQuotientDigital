var express = require('express')
var router = express.Router()
var path = require('path')

var restuarant = require("./c1");
var review = require("./c2");

router.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/webapp/index.html'));
});

//-----------------API to onboard/add new restuarant--------------------------------------
router.post('/onboard', function(req, res) {
	
 	 
    console.log(req.body);

    let restObj = new restuarant({
        Name: req.body.name,
        Location: req.body.location,
        Cuisines: req.body.cuisines,
        Tables: req.body.tables
            
    });

    //      console.log(restObj);

    restObj.save(function(err, result) {
        if (err) {
            errorCB(err);
            return;
        }         
        
    });
    res.send("ADDED");


});//end post

// -----------API to update restuarant---------------------
router.patch('/update/:restName', function(req, res) {
    
     
    console.log(req.body.Name);
    
        restuarant.update({ Name: req.body.Name}, {

                       $set: {
                                'Location': req.body.Location,
                                'Cuisines': req.body.Cuisines,
                                'Tables': req.body.Tables                                
                        }
                },
                function(err) {console.log(err)}

       );

       res.status(200).json(); 


});//end patch

// ---------------API to get available restuarants-----------------
router.get('/getRests', function(req,res){
    let restuarantsMap = {};
    restuarant.find({}, function(err, restuarants) {
        if (err) {
            errorCB(err);
            return;
        }
        restuarants.forEach(function(result) {
            restuarantsMap[result._id] = result;
        });
        res.status(200).json(restuarants);
        console.log(restuarants);
    });
});


// ---------------API to delete restuarant-----------------
router.delete('/remove/:name', function(req,res){
    let restName = req.params.name;
    restuarant.findOneAndRemove({Name: restName}, function(err){console.log(err)});

            res.status(200).json();

});
       


//-----------------API to Search by Restuarant Name--------------------------------------
router.get('/searchByName/:name', function(req,res){
    let restName = req.params.name;
    let restuarantsMap = {};
    restuarant.find({Name: restName}, function(err, restuarants) {
        if (err) {
            errorCB(err);
            return;
        }
        restuarants.forEach(function(result) {
            restuarantsMap[result._id] = result;
        });
        res.status(200).json(restuarants);
        console.log(restuarants);
    });
});

//-----------------API to Search by Restuarant Location--------------------------------------
router.get('/searchByLocation/:location', function(req,res){
    let loc = req.params.location;
    let restuarantsMap = {};
    restuarant.find({Location: loc}, function(err, restuarants) {
        if (err) {
            errorCB(err);
            return;
        }
        restuarants.forEach(function(result) {
            restuarantsMap[result._id] = result;
        });
        res.status(200).json(restuarants);
        console.log(restuarants);
    });
});

//-----------------API to Search by Restuarant Cuisine--------------------------------------
router.get('/searchByCuisine/:cuisine', function(req,res){
    let cuisine = req.params.cuisine;
    let restuarantsMap = {};
    restuarant.find({Cuisines: cuisine}, function(err, restuarants) {
        if (err) {
            errorCB(err);
            return;
        }
        restuarants.forEach(function(result) {
            restuarantsMap[result._id] = result;
        });
        res.status(200).json(restuarants);
        console.log(restuarants);
    });
});

//-----------------API to post Review--------------------------------------
router.post('/reviewed', function(req, res) {
    
     
    console.log(req.body);

    let reviewObj = new review({
        Name: req.body.restName,
        Location: req.body.restLocation,
        Comments: req.body.comment            
    });


    reviewObj.save(function(err, result) {
        if (err) {
            errorCB(err);
            return;
        }         
        
    });
    res.send("POSTED REVIEW!!");


});//end post



module.exports = router