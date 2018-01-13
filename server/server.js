const express = require('express'),
  bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')

let {Todo} = require('./models/todo'),
  {User} = require('./models/user')

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000')
});





