const Actor = require("./actors");
const Director = require("./directors");
const Genre = require("./genres");
const Movie = require("./movies");

Movie.belongsToMany(Actor, { through: 'movies_actors'})
Movie.belongsToMany(Director, { through: 'movies_director'})
Movie.belongsToMany(Genre, { through: 'movies_genres'})