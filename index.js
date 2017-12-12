const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/database');
const path = require('path');

var port = 8090;
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

app.use(express.static(__dirname+'/client/dist/'));

app.get('/', (req, res)=> {
	res.sendFile(path.join(__dirname+'/client/dist/index.html'));
	});


// app.get('/', (req, res)=> {
// res.send('<h3>Hello Worlds: PHP to node</h3>');
// });

app.listen(port, ()=>{
	console.log('listening on port '+port);
})