const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose'),
{Todo} = require('./../server/models/todo'),
{User} = require('./../server/models/user');

let id = '5a5bbc3fc0cf1482ee3ebf15';

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todos);
// });


// if (!ObjectID.isValid(id)) {

//   console.log('Id not valid')

// }

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found')
//   }
//   console.log('Todo', todos);
// }).catch((e) => console.log(e));



User.findById(id).then((user) => {
  if (!user) {
    console.log('User not found')
  }

  console.log('User', user);
}, (e) => console.log(e));


