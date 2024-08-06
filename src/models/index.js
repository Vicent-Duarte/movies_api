const Actor = require("./actors.model");
const Director = require("./directors.model");
const Genre = require("./genres.model");
const Movie = require("./movies.model");

Movie.belongsToMany(Actor, { through: 'movies_actors'})
Movie.belongsToMany(Director, { through: 'movies_director'})
Movie.belongsToMany(Genre, { through: 'movies_genres'})