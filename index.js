const express = require('express');
const app = express();
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');

var port = 8080;
// mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.connect(config.uri,{ useMongoClient: true }, (err)=>{
	if(err){
		console.log('Could not connect to database', err);
	}else{

		console.log('connected to database'+config.db);
		console.log(config.secret);
	}
});


// use ng build to work with angular
// in angular
// and then add routes for angular collabirating with node 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname+'/client/dist/'));
app.use('/authentication', authentication);
app.get('/', (req, res)=> {
	res.sendFile(path.join(__dirname+'/client/dist/index.html'));
	});


// app.get('/', (req, res)=> {
// res.send('<h3>Hello Worlds: PHP to node</h3>');
// });

app.listen(port, ()=>{
	console.log('listening on port '+port);
})