// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log(result);
  });

  // db.close();
});

