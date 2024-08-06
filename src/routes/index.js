const express = require('express');
const routerActor = require('./actors.router');
const routerDirector = require('./directors.router');
const routerGenre = require('./genres.router');
const routerMovie = require('./movies.router');
const router = express.Router();

router.use('/actors', routerActor)
router.use('/directors', routerDirector)
router.use('/genres', routerGenre)
router.use('/movies', routerMovie)

module.exports = router;