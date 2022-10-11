require("reflect-metadata")
const request = require('supertest')
import { mongooseLoader, startServer, mongooseUnloader } from "../loaders"
import { ControllerTestUser } from "../content/helpers.js"
import UserService from "../services/user.js"
import UserModel from "../models/user"
import mongoose from 'mongoose'

let app;
beforeAll(async () => {
  app = startServer()
  await mongooseLoader('mongodb://localhost:27017/test-db')
})

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let connection of collections) {
    await connection.deleteMany({});
  }
  await mongooseUnloader()
})

let token

describe("User Controller: /user", () => {
  describe("POST /user/register", () => {
    beforeAll(async () => {
      await UserService.register(ControllerTestUser[0])
    })
    afterAll(async () => {
      await UserModel.deleteOne({ email: ControllerTestUser[0].email })
    })
    it("should register user", async () => {
      const res = await request(app)
        .post('/user/register')
        .send(ControllerTestUser[0])
      expect(res.statusCode).toEqual(401)
      // expect(res.body).toHaveProperty('post')
    })
  })
})
