var express = require('express');
var app = express();

    var o = [
  {
    "title": "Mein Task",
    "event": "flame",
    "moment": "Gerade",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      },
      {
        "avatar": "bild2.png",
        "name": "Markus"
      }
    ]
  },
  {
    "title": "Mein Task2",
    "event": "Checkin",
    "moment": "Vor 8 Minuten",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      }
    ]
  },
  {
    "title": "Mein Task3",
    "event": "Checkout",
    "moment": "Vor einer Stunde",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      }
    ]
  },
  {
    "title": "Mein Task",
    "event": "flame",
    "moment": "Gerade",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      },
      {
        "avatar": "bild2.png",
        "name": "Markus"
      }
    ]
  },
  {
    "title": "Mein Task2",
    "event": "Checkin",
    "moment": "Vor 8 Minuten",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      }
    ]
  },
  {
    "title": "Mein Task3",
    "event": "Checkout",
    "moment": "Vor einer Stunde",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      }
    ]
  },
  {
    "title": "Mein Task",
    "event": "flame",
    "moment": "Gerade",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      },
      {
        "avatar": "bild2.png",
        "name": "Markus"
      }
    ]
  },
  {
    "title": "Mein Task2",
    "event": "Checkin",
    "moment": "Vor 8 Minuten",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      }
    ]
  },
  {
    "title": "Mein Task3",
    "event": "Checkout",
    "moment": "Vor einer Stunde",
    "description": "Description Description Description Description",
    "users": [
      {
        "avatar": "bild1.png",
        "name": "Matthias"
      }
    ]
  }
];



app.get('/tasks', function(req, res) {
  res.json(o);
});

app.listen(5000);