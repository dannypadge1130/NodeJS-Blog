var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var BlogEntry = require('./mongo');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {

	response.render('index.html');

});

app.get('/api/blogentries', function(request, response) {

	BlogEntry.find(function(err, entries) {

		if(err) {
			response.send({
				success:false,
				msg:'There was an error'
			});
		} else {
			response.send({
				success:true,
				blogentries:entries
			});
		}

	});

});

app.get('/create', function(request, response) {

	response.render('create.html');

});

app.post('/create', function(request, response) {

	var blogEntry = new BlogEntry ({
		title: request.body.title,
		post: request.body.post
	});

	blogEntry.save(function(err, model) {

        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.redirect('/');
        }

	});

});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});