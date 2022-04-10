import db from '../config/db';
import movieSchemaValidation from '../utils/movie.schema';

/**
 * Controller to insert a new movie
 * @memberof controller
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Object}
 */
exports.addMovie = async (req, res) => {
  try {
    // validate schema
    const { error } = movieSchemaValidation.validateMovie(req.body);
    if (error) return res.status(400).send({ message: error });

    const { title, year, actors, description } = req.body;

    await db.query('INSERT INTO movie (title, year, actors, description) VALUES ($1, $2, $3, $4) RETURNING *', [title, year, actors, description]);
    res.status(201).send({ message: 'Successfully added a new movie' });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/**
 * Controller to get all movies
 * @memberof controller
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Array}
 */
exports.getAllMovies = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * from movie ORDER BY title ASC'
    );
    if (rows.length === 0) {
      res.status(404).json({ message: 'No movies found' });
    }
    res.status(200).send(rows);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/**
 * Controller to find movie by Id
 * @memberof controller
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Array} single array if found or an object if no movies found
 */
exports.findMovieById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { rows } = await db.query('SELECT * from movie WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ message: `No movie found for id ${id}` });
    } else {
      res.status(200).send(rows);
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/**
 * Controller to update movie by Id
 * @memberof controller
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Object}
 */
exports.updateMovieById = async (req, res) => {
  try {
    // validate schema
    const { error } = movieSchemaValidation.validateMovie(req.body);
    if (error) return res.status(400).send({ message: error });

    const id = parseInt(req.params.id);
    const { title, year, actors, description } = req.body;
    const { rowCount } = await db.query('Update movie SET title = $1, year = $2, actors = $3, description = $4 WHERE id = $5', [title, year, actors, description, id]);
    if (rowCount === 0) {
      res.status(404).send({ message: `No movie found for id ${id}` });
    } else {
      res.status(200).send({ message: 'Movie updated successfully' });
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

/**
 * Controller to delete a movie by Id
 * @memberof controller
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {Object}
 */
exports.deleteMovieById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { rowCount } = await db.query('DELETE FROM movie WHERE id = $1', [id]);
    if (rowCount === 0) {
      res.status(404).send({ message: `No movie found for id ${id}` });
    } else {
      res.status(200).send({ message: 'Movie deleted successfully' });
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
