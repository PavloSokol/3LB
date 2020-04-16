var express = require('express');
var app = express();
var path = require('path'); 
var favicon = require('serve-favicon');

var log = require('./libs/log')(module);


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, "public")));


app.listen(1337, function(){
    console.log('Express server listening on port 1337');
    }); 

app.get("/add", function(request, response){

    response.send("<h1>Привіт Express!</h1>");
});

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
    });
    
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
     return;
    }); 

app.get('/ErrorExample', function(req, res, next){
        next(new Error('Random error!'));
        }); 


        app.get('/api/articles', function(req, res) {
            res.send('This is not implemented now');
            });
            app.post('/api/articles', function(req, res) {
             res.send('This is not implemented now');
            });
            app.get('/api/articles/:id', function(req, res) {
            res.send('This is not implemented now');
            });
            app.put('/api/articles/:id', function (req, res){
            res.send('This is not implemented now');
            });
            app.delete('/api/articles/:id', function (req, res){
            res.send('This is not implemented now');
            });
            



