//var bcrypt = require('bcrypt')
var express = require('express');
var mongodb = require('mongodb');


//#############################################
// These const/vars should be changed to use your own 
// ID, password, databse, and ports
const SERVER_PORT = 8100;
var user = 's_chumber';
var password = 'A00433094';
var database = 's_chumber';
//#############################################


//These should not change, unless the server spec changes
var host = '127.0.0.1';
var port = '27017'; // Default MongoDB port for all the students


// Now create a connection String to be used for the mongo access
var connectionString = 'mongodb://' + user + ':' + password + '@' +
    host + ':' + port + '/' + database;
console.log(connectionString);

//CORS Middleware, causes Express to allow Cross-Origin Requests
// Do NOT change anything here
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
};

//set up the server variables
var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.static(__dirname));

//#############################################
//the var for the University collections
var universitiesCollection;
const NAME_OF_COLLECTION = 'universities';
//#############################################

//now connect to the db
mongodb.connect(connectionString, function (error, db) {
    
    if (error) {
        throw error;
    }//end if

    universitiesCollection = db.collection(NAME_OF_COLLECTION);
    
    
// accepts post requests - INSERT UNIVERSITY
app.post('/addUniversity', function (request, response) {
        console.log('In Add university post call ');
        var univObj =request.body;

    console.log("Process being executed in " + __dirname);
        universitiesCollection.insert(univObj,
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }//end if

           return response.send(200, '<p>Record inserted successfully</p>');
       });

});
// SEARCH UNIVERSITY 
app.post('/searchUniversity', function (request,response) {
	console.log('In Search university post call');
	var key = request.body;

        console.log("Process being executed in " + __dirname);
        universitiesCollection.find(key,
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }//end if
	    result.toArray( function (err, resultArray) {
           	 if (err) {
                	return response.send(400, 'An error occurred processing your records.');
           	 }//end if

            	//if succeeded, send it back to the calling thread
           	 return response.send(200, resultArray);
       	    });
       });

});
// SEARCH UNIVERSITY
app.post('/searchUniversity', function (request,response) {
        console.log('In Search university post call');
        var key = request.body;

        console.log("Process being executed in " + __dirname);
        universitiesCollection.find(key,
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }//end if
            result.toArray( function (err, resultArray) {
                 if (err) {
                        return response.send(400, 'An error occurred processing your records.');
                 }//end if

                //if succeeded, send it back to the calling thread
                 return response.send(200, resultArray);
            });
       });

});
// SEARCH UNIVERSITY
app.post('/searchUniversity', function (request,response) {
        console.log('In Search university post call');
        var key = request.body;

        console.log("Process being executed in " + __dirname);
        universitiesCollection.find(key,
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }//end if
            result.toArray( function (err, resultArray) {
                 if (err) {
                        return response.send(400, 'An error occurred processing your records.');
                 }//end if

                //if succeeded, send it back to the calling thread
                 return response.send(200, resultArray);
            });
       });

});
// SEARCH UNIVERSITY
app.post('/searchUniversity', function (request,response) {
        console.log('In Search university post call');
        var key = request.body;

        console.log("Process being executed in " + __dirname);
        universitiesCollection.find(key,
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }//end if
            result.toArray( function (err, resultArray) {
                 if (err) {
                        return response.send(400, 'An error occurred processing your records.');
                 }//end if

                //if succeeded, send it back to the calling thread
                 return response.send(200, resultArray);
            });
       });

});

// DELETE UNIVERSITY
app.post('/deleteUniversity', function (request,response) {
        console.log('In delete university post call');
	var key = request.body;
	
        console.log("Process being executed in " + __dirname);
        universitiesCollection.remove(key,
        function (err, returnedStr) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }//end if

	 if( returnedStr != null) {	
	  console.log("Record found to be deleted");
	  var obj = JSON.parse(returnedStr);//convert it to an obj
	  console.log(obj.n + " records"); //contain # of removed docs 
          return response.send(200, obj);
	}

 
       });

});


// DISPLAY ALL UNIVERSITIES
app.post('/displayUniversity', function (request,response) {
        console.log('In display all universities post call');

        console.log("Process being executed in " + __dirname);
        universitiesCollection.find(
        function (err, result) {
           if (err) {
               return response.send(400,'An error occurred saving a record.');
           }//end if
            result.toArray( function (err, resultArray) {
                 if (err) {
                        return response.send(400, 'An error occurred processing your records.');
                 }//end if

                //if succeeded, send it back to the calling thread
                 return response.send(200, resultArray);
            });
       });

});

    
    // Close the database connection and server when the application ends
    process.on('SIGTERM', function () {
        console.log("Shutting server down.");
        db.close();
        app.close();
    });

 //now start the application server
    var server = app.listen(SERVER_PORT, function () {
    console.log('Listening on port %d',
        server.address().port);
    });
});
