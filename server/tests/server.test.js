const expect = require('expect'),
request = require('supertest'),
{ObjectID} = require('mongodb');

const {app} = require('./../server'),
{Todo} = require('./../models/todo')

const todos = [{
  text: 'First test todo',
  _id: new ObjectID()
}, {
  text: 'Second test todo',
  _id: new ObjectID()
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('Post /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create todo with invalid body', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));

    });
  });
});

describe('GET /todos', () => {

  it('should get all todos', (done) => {

    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);

  });
});

describe('GET /todos/:id', () => {

  it('should return a todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {

    let id = new ObjectID().toString();

    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {

    request(app)
      .get('/todos/3')
      .expect(404)
      .end(done);
  });

});


describe('DELETE /todos/:id', () => {

  it('should delete a todo by id', (done) => {

    request(app)
    .delete(`/todos/${todos[0]._id.toString()}`)
    .expect(200)
    .end((err, res) => {
      if (err) {
        return done(err);
      };
    });
    done();
  });
});
