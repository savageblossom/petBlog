'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Post = require('./models/Post');

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_mongoose2.default.connect('mongodb://localhost/blog', { useNewUrlParser: true });

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.post('/posts', function (req, res) {

  var data = req.body;

  var post = new _Post2.default({
    title: data.title,
    text: data.text
  });

  post.save().then(function () {
    res.send({ status: "ok" });
  });
});

app.get('/posts', function (req, res) {
  _Post2.default.find().then(function (err, posts) {
    if (err) {
      res.send(err);
    }
    res.json(posts);
  });
});

app.delete('/posts/:id', function (req, res) {
  _Post2.default.remove({
    _id: req.params.id
  }).then(function (post) {
    if (post) {
      res.json({ status: 'Deleted successfully!' });
    } else {
      res.json({ status: 'Error' });
    }
  });
});

app.put('/posts/:id', function (req, res) {
  _Post2.default.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err) {
    if (err) {
      res.send(err);
    }

    res.json({ status: 'Up to date' });
  });
});

app.listen(1488, function () {
  console.log('Server started!');
});