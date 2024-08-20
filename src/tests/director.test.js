const request = require('supertest');
const app = require('../app');

const director = {
  firstName: "Quentin",
  lastName: "Tarantino",
  nationality: "American",
  image: "https://es.wikipedia.org/wiki/Archivo:Quentin_Tarantino_by_Gage_Skidmore.jpg",
  birthday: "1963-03-27"
}

const BASE_URL = '/api/v1/directors'

let directorId

test("POST -> '/directors', BASE_URL should return statusCode 201, and res.body.firstName === director.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(director)

  directorId = res.body.id
  
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(director.firstName)
})

test("GET -> '/directors', BASE_URL should return statusCode 200, and res.body.length should be greater than 0", async () => {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.length).toBeGreaterThan(0)
})

test('PUT -> BASE_URL/directorId, should return statusCode 200, and res.body.firstName == directorUpdate.firstName', async () => {
  
  const directorUpdate = {
    firstName: "Samuel",
    lastName: "Jackson",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/SamuelLJackson.jpg/250px-SamuelLJackson.jpg",
    birthday: "1948-12-21"
  }
  
  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(directorUpdate.firstName)

})

test('DELETE -> BASE_URL/directorId, should return statusCode 204', async () => {
  
  const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)
    
  expect(res.statusCode).toBe(204)
})