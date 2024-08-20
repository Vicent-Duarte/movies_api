const request = require('supertest');
const app = require('../app');

const actor = {
  firstName: "Vin",
  lastName: "Diesel",
  nationality: "American",
  image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Vin_Diesel_XXX_Return_of_Xander_Cage_premiere.png",
  birthday: "1967-07-18"
}

const BASE_URL = '/api/v1/actors'

let actorId

test("POST -> '/actors', BASE_URL should return statusCode 201, and res.body.firstName === actor.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(actor)

  actorId = res.body.id
  
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actor.firstName)
})

test("GET -> '/actors', BASE_URL should return statusCode 200, and res.body.length should be greater than 0", async () => {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.length).toBeGreaterThan(0)
})

test('PUT -> BASE_URL/actorId, should return statusCode 200, and res.body.firstName == actorUpdate.firstName', async () => {
  
  const actorUpdate = {
    firstName: "Jason",
    lastName: "Statham",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Jason_Statham_2018.jpg/640px-Jason_Statham_2018.jpg",
    birthday: "1967-07-26"
  }
  
  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(actorUpdate.firstName)

})

test('DELETE -> BASE_URL/actorId, should return statusCode 204', async () => {
  
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)
    
  expect(res.statusCode).toBe(204)
})