const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Actor, { through: 'movies_actors'})
Movie.belongsToMany(Director, { through: 'movies_director'})
Movie.belongsToMany(Genre, { through: 'movies_genres'})