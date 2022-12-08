var router = require('express').Router();
//const moviesDal = require('../../services/pg.movies.dal')
const moviesDal = require('../../services/m.movies.dal')

// api/movies
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/movies/ GET ' + req.url);
    try {
        let themovies = await moviesDal.getMovies().title(); 
        res.json(themovies);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// api/movies/:id
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/movies/:id GET ' + req.url);
    try {
        let anMovie = await moviesDal.getMovieByMovieId(req.params.id); 
        if (anMovie.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        }
        else
            res.json(anMovie);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.post('/', async (req, res) => {
    if(DEBUG) { 
        console.log('ROUTE: /api/movies/ POST');
    //    console.log(req);
    }
    try {
        await moviesDal.addMovie(req.body.title, req.body.plot, req.body.poster );
        res.statusCode = 201;
        res.json({message: "Created", status: 201});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    } 
});
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/movies PUT ' + req.params.id);
    try {
        await moviesDal.putMovie(req.params.id, req.body.title, req.body.plot, req.body.poster);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/movies PATCH ' + req.params.id);
    try {
        await moviesDal.patchMovie(req.params.id, req.body.title, req.body.plot, req.body.poster);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/movies DELETE ' + req.params.id);
    try {
        await moviesDal.deleteMovie(req.params.id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// list the active api routes
if(DEBUG) {
    router.stack.forEach(function(r){
        if (r.route && r.route.path){
        console.log(r.route.path)
        }
    });
}

module.exports = router;