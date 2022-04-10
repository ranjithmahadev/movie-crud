import Joi from 'joi';

const schema = {
  title: Joi.string().min(1).empty().required(),
  year: Joi.string().min(4).required(),
  actors: Joi.string().min(1).required(),
  description: Joi.string().min(1).required()
};

exports.validateMovie = (movie) => Joi.validate(movie, schema);
