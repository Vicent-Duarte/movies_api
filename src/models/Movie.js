const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Movie = sequelize.define("movie", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT
  },
  synopsis: {
    type: DataTypes.STRING
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

});

module.exports = Movie;