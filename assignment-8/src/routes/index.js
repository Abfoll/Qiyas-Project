const express = require('express');

const statsRouter = require('./statsRouter');
const usersRouter = require('./usersRouter');
const productsRouter = require('./productsRouter');

const router = express.Router();

router.use(statsRouter);
router.use(usersRouter);
router.use(productsRouter);

module.exports = router;