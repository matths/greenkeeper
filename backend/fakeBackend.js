var express = require('express');
var app = express();

 app.use('/*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        next();
    });

app.get('/tasks', function(req, res){
    var o = {
        avatar: "cdsvs.png",
        test: "test"
    }
  res.json(o);
});

app.listen(5000);
