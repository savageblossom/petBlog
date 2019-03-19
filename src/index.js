import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import PostModel from './models/Post';

const app = express();
mongoose.connect('mongodb://localhost/blog', ({ useNewUrlParser: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/posts', (req, res) => {

  const data = req.body;

  const post = new PostModel({
    title: data.title,
    text: data.text
  });

  post.save().then(() => {
    res.send({status: "ok"});
  })
})

app.get('/posts', (req, res) => {
  PostModel.find().then((err, posts) => {
    if(err) {
      res.send(err);
    }
    res.json(posts);
  });
});


app.delete('/posts/:id', (req, res) => {
  PostModel.remove({
    _id: req.params.id
  }).then(post => {
    if(post) {
      res.json({ status: 'Deleted successfully!'});
    } else {
      res.json({ status: 'Error' });
    }
  });
});

app.put('/posts/:id', (req, res) => {
  PostModel.findByIdAndUpdate(req.params.id, { $set: req.body}, (err) => {
    if(err) {
      res.send(err);
    }

    res.json({status: 'Up to date'});
  })
})

app.listen(1488, () => {
  console.log('Server started!')
})
