require('../models')
const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actors');
const Director = require('../models/Directors');
const Genre = require('../models/Genres');

const BASE_URL = '/api/v1/movies';
let movieId;

const movie = {
  name: "LIGHTS OUT",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Lights_Out_Movie_Logo.svg/220px-Lights_Out_Movie_Logo.svg.png",
  synopsis: "Lights Out (titulada: Cuando las luces se apagan en Hispanoamérica y Nunca apagues la luz en España) es una película de terror de 2016 escrita y dirigida por David F. Sandberg, en su debut cinematográfico, basada en su cortometraje homónimo de 2013.",
  releaseYear: 2016
};

test("POST -> BASE_URL, should return statusCode 201, and res.body.name === movie.name", async() => {
  const res = await request(app)
    .post(BASE_URL)
    .send(movie)
  
  movieId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length > 0", async() => {
  const res = await request(app)
    .get(BASE_URL)
  
  console.log('resultado', res.body)
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.length).toBeGreaterThan(0)
  expect(res.body[0].actors).toBeDefined()
  expect(res.body[0].directors).toBeDefined()
  expect(res.body[0].genres).toBeDefined()
});

test("PUT -> BASE_URL/movieId, should return statusCode 200, and res.body.name === movieUpdate.name", async() => {
  const movieUpdate = {
    name: "LIGHTS OUT",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Lights_Out_Movie_Logo.svg/220px-Lights_Out_Movie_Logo.svg.png",
    synopsis: "Lights Out (titulada: Cuando las luces se apagan en Hispanoamérica y Nunca apagues la luz en España) es una película de terror de 2016 escrita y dirigida por David F. Sandberg, en su debut cinematográfico, basada en su cortometraje homónimo de 2013.",
    releaseYear: 2016
  };
  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)
  
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
});

test('POST -> BASE_URL/:id/actors, should return statusCode 200, and res.body.length === 1', async () => {

  const actor = {
    firstName: "Vin",
  lastName: "Diesel",
  nationality: "American",
  image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Vin_Diesel_XXX_Return_of_Xander_Cage_premiere.png",
  birthday: "1967-07-18"
  };

  const createActor = await Actor.create(actor)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([createActor.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createActor.id)

  await createActor.destroy()
});

test('POST -> BASE_URL/:id/directors, should return statusCode 200, and res.body.length === 1', async () => {

  const director = {
    firstName: "Quentin",
    lastName: "Tarantino",
    nationality: "American",
    image: "https://es.wikipedia.org/wiki/Archivo:Quentin_Tarantino_by_Gage_Skidmore.jpg",
    birthday: "1963-03-27"
  };

  const createDirector = await Director.create(director)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([createDirector.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createDirector.id)

  await createDirector.destroy()
});

test('POST -> BASE_URL/:id/genres, should return statusCode 200, and res.body.length === 1', async () => {

  const genre = {
    name: "Action"
  };

  const createGenre = await Genre.create(genre)

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([createGenre.id])

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createGenre.id)

  await createGenre.destroy()
});

test("DELETE -> BASE_URL/movieId, should return statusCode 204", async() => {
  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)
  
  console.log('delete', res.body)
  expect(res.statusCode).toBe(204)
});