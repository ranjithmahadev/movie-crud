import Router from 'express-promise-router';
import movieController from '../controllers/movie.controller';

const router = Router();

// add a new movie
router.post('/movies', movieController.addMovie);
// get all movies
router.get('/movies', movieController.getAllMovies);
// get movie by Id
router.get('/movies/:id', movieController.findMovieById);
// update movie by Id
router.put('/movies/:id', movieController.updateMovieById);
// delete movie by Id
router.delete('/movies/:id', movieController.deleteMovieById);

module.exports = router;
