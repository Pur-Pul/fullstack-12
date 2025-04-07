const express = require('express');
const router = express.Router();
const redis = require('../redis');

/* GET statistics */
router.get('/', async (_, res) => {
  const value = await redis.getAsync("added_todos")
  console.log(value)
  res.send({"added_todos": value ? value : 0});
});

module.exports = router;
