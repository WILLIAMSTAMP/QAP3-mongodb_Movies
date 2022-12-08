var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api/movies');
}

const moviesRouter = require('./movies')
router.use('/movies', moviesRouter);

module.exports = router;