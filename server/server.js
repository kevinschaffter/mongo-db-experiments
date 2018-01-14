const express = require('express'),
  bodyParser = require('body-parser'),
  {ObjectID} = require('mongodb');


const {mongoose} = require('./db/mongoose')

let {Todo} = require('./models/todo'),
  {User} = require('./models/user')

let app = express();

const port = process.env.PORT || 3000

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

app.get('/todos', (req, res) => {

  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});



app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)) {

    return res.status(404).send('Id is not valid');
  }

  Todo.findById(id).then((todo) => {

    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => console.log(e))

});

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
});

module.exports = {app};





