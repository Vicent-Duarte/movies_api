const catchError = require("../utils/catchError");
const Movie = require("../models/movies.model");
const Genre = require("../models/genres.model");
const Actor = require("../models/actors.model");
const Director = require("../models/directors.model");

const getAll = catchError(async (req, res) => {
  const results = await Movie.findAll({ include: [
    {
      model: Genre,
      attributes: {exclude: [ 'createdAt', 'updatedAt']},
      through: { attributes: [] }
    }, 
    {
      model: Actor,
      attributes: {exclude: ['createdAt', 'updatedAt']},
      through: { attributes: [] }
    },
     {
      model: Director,
      attributes: {exclude: [ 'createdAt', 'updatedAt']},
      through: { attributes: [] }
     }
    ] 
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Movie.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.bulk({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Movie.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setActors = catchError(async (req, res) => {
  const { id } = req.params
  const movie = await Movie.findByPk(id)
  await movie.setActors(req.body)
  const actors = await movie.getActors()
  return res.json(actors)
})

const setDirectors = catchError(async (req, res) => {
  const { id } = req.params
  const movie = await Movie.findByPk(id)
  await movie.setDirectors(req.body)
  const directors = await movie.getDirectors()
  return res.json(directors)
})

const setGenres = catchError(async (req, res) => {
  const { id } = req.params
  const movie = await Movie.findByPk(id)
  await movie.setGenres(req.body)
  const genres = await movie.getGenres()
  return res.json(genres)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setActors,
  setActors,
  setDirectors,
  setGenres
};