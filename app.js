
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app);

// all environments
//app.set('port', process.env.PORT || 3000);

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//Handle Errors gracefully
app.use(function(err, req, res, next) {
	if(!err) return next();
	console.log(err.stack);
	res.json({error: true});
});

//Main App Page
app.get('/', routes.indexSumula);
app.get('/Sumula', routes.indexSumula);
app.get('/Atleta', routes.indexAtleta);
app.get('/Artilharia', routes.indexArtilharia);

//Partials
app.get('/partials/sumula/:name', routes.partialsSumula);
app.get('/partials/atleta/:name', routes.partialsAtleta);
app.get('/partials/artilharia/:name', routes.partialsArtilharia);

//MongoDB API Routes
app.get('/sumulas/sumulas', routes.listSumula);
app.get('/sumulas/:id', routes.sumula);
app.post('/sumulas', routes.createSumula);

app.get('/atletas/atletas', routes.listAtleta);
app.get('/atletas/:id', routes.atleta);
app.post('/atletas', routes.createAtleta);

app.get('/artilheiros/artilheiros', routes.listArtilharia);

server.listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});