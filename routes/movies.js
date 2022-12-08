const express = require('express');
const router = express.Router();
const moviesDal = require('../services/m.movies.dal')




router.get('/', async (req, res) => {
    try {
        let movies = await moviesDal.getMovies(); 
        if(DEBUG) console.log(movies);
        res.render('movies', {movies});
    } catch {
        res.render('503');
    }
});

router.get('/:id', async (req, res) => {
    try {
        let anMovie = await moviesDal.getMovieByMovieId(req.params.id); 
        if (anMovie.length === 0)
            res.render('norecord')
        else
            res.render('title', {anMovie});
    } catch {
        res.render('503');
    }
});

router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('Movie.Replace : ' + req.params.id);
    res.render('moviePut.ejs', {title: req.query.title, plot: req.query.plot, poster: req.query.poster, theId: req.params.id});
});

router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('Movie.Edit : ' + req.params.id);
    res.render('moviePatch.ejs', {title: req.query.title, plot: req.query.plot, poster: req.query.poster, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('Movie.Delete : ' + req.params.id);
    res.render('movieDelete.ejs', {title: req.query.title, theId: req.params.id});
});



// POST, PUT, PATCH, DELETE

router.post('/', async (req, res) => {
    if(DEBUG) console.log("movies.POST");
    try {
        await moviesDal.addMovie(req.body.title, req.body.plot, req.body.poster );
        res.redirect('/movies/');
    } catch {
        res.render('503');
    } 
});

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('movies.PUT: ' + req.params.id);
    try {
        await moviesDal.putMovie(req.params.id, req.body.title, req.body.plot, req.body.poster);
        res.redirect('/movies/');
    } catch {
        res.render('503');
    }
});
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('movies.PATCH: ' + req.params.id);
    try {
        await moviesDal.patchMovie(req.params.id, req.body.title, req.body.plot, req.body.poster);
        res.redirect('/movies/');
    } catch {
        res.render('503');
    }
});
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('movies.DELETE: ' + req.params.id);
    try {
        await moviesDal.deleteMovie(req.params.id);
        res.redirect('/movies/');
    } catch {
        res.render('503');
    }
});

module.exports = router