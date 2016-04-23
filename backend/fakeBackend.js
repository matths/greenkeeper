var express = require('express');
var app = express();

app.get('/tasks', function(req, res){
    var o = {
        avatar: "cdsvs.png",
        test: "test"
    }
  res.json(o);
});

app.listen(5000);