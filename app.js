var express = require('express');
var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// MORE IMPORTS HERE
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
   res.render('home');
});

app.use(function (req, res, next) {
   console.log("Looking for URL : " + req.url);
   next();
});

app.get('/junk', function(req, res, next){
   console.log('Tried to access /junk');
   throw new Error('/junk doesn\'t exists');
});

app.use(function(err, req, res, next){
   console.log('Error : ' + err.message);
   next();
});


app.get('/about', function(req, res){
   res.render('about');
});




app.listen(app.get('port'), function(){
   console.log("Express started on http://localhost:" + app.get('port') + ' press Ctrl-C to terminate');

});