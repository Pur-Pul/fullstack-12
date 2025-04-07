const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let todo_n = await redis.getAsync("added_todos")
  todo_n = todo_n ? parseInt(todo_n)+1 : 1
  redis.setAsync("added_todos", todo_n)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
  //res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.todo.id, {text: req.body.text, done: req.body.done}, {new: true})
  res.send(todo);
  //res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
