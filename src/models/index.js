const Actor = require("./Actors");
const Director = require("./Directors");
const Genre = require("./Genres");
const Movie = require("./Movies");

Movie.belongsToMany(Actor, { through: 'movies_actors'})
Movie.belongsToMany(Director, { through: 'movies_director'})
Movie.belongsToMany(Genre, { through: 'movies_genres'})