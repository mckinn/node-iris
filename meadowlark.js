
// At page 63

var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    var now = new Date();
    res.render('home', {theDate: now, theUser: "userid", thePw:"password"});
});
app.post('/', function(req, res){
//    console.log('Received contact from ' + req.body.userid + ' <' + req.body.pass + '>');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    console.log(s);
    var s = '--------------body-------------\n';
    for(var name in req.body) s += name + ': ' + req.body[name] + '\n';
    console.log(s);
    var s = '--------------dump-------------\n';
    console.log(s);
    console.log(req);
    res.redirect(303, '/thank-you');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/headers', function(req,res){
	res.set('Content-Type','text/plain');
	var s = '';
	for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});