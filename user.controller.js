require("reflect-metadata")
const request = require('supertest')
import { mongooseLoader, startServer, mongooseUnloader } from ".."
import { ControllerTestUser } from "./helpers.js"
import UserService from "../services/user.js"
import UserModel from "../models/user"

let app;
beforeAll(async () => {
  app = startServer()
  await mongooseLoader('mongodb://localhost:27017/test-db')
})

afterAll(async () => {
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
    it("should return bad request", async () => {
      const payload = { email: ControllerTestUser[0].email }
      return request(app)
        .post("/user/register")
        .send(payload)
        .expect(401)
        .expect("Content-Type", /json/)
        .then(res => {
          // const apiResponse = ApiResponse.failed({
          //   statusCode: 400,
          //   data: { body: expect.any(Object) },
          // })

          expect(res.status).toEqual(401)
        })
    })
    it("should return user already registered with this email", async () => {
      const payload = ControllerTestUser[0]
      return request(app)
        .post("/user/register")
        .send(payload)
        .expect(409)
        .expect("Content-Type", /json/)
        .then(res => {
          // const apiResponse = ApiResponse.failed({
          //   statusCode: 404,
          //   errorCode: ErrorCodes.USER_NOT_FOUND,
          //   message: ErrorCodesMeta.USER_NOT_FOUND.message,
          //   data: { email: payload.email },
          // })

          // expect(res.body).toEqual(expect.objectContaining(apiResponse))
          expect(res.status).toEqual(409)
        })
    })
    it("should register user", async () => {
      const payload = ControllerTestUser[1]
      return request(app)
        .post("/user/register")
        .send(payload)
        .expect(200)
        .expect("Content-Type", /json/)
        .then(res => {
          // token = res.body.data.token
          // const apiResponse = ApiResponse.success({
          //   statusCode: 200,
          //   message: SuccessCodesMeta.User_AUTHORIZED_SUCCESSFULLY.message,
          //   data: { token: expect.any(String) },
          // })

          // expect(res.body).toEqual(expect.objectContaining(apiResponse))
          expect(res.status).toEqual(200)
        })
    })
  })
  describe("POST /user/login", () => {
    beforeAll(async () => {
      await UserService.register(ControllerTestUser[0])
    })
    afterAll(async () => {
      await UserModel.deleteOne({ email: ControllerTestUser[0].email })
    })
    it("should return bad request", async () => {
      const payload = { email: ControllerTestUser[0].email }
      return request(app)
        .post("/user/login")
        .send(payload)
        .expect(401)
        .expect("Content-Type", /json/)
        .then(res => {
          // const apiResponse = ApiResponse.failed({
          //   statusCode: 400,
          //   data: { body: expect.any(Object) },
          // })

          expect(res.status).toEqual(401)
        })
    })
    it("should return invalid user not found with this email and password", async () => {
      const payload = {
        email: ControllerTestUser[1].email,
        password: ControllerTestUser[1].password,
      }
      return request(app)
        .post("/user/login")
        .send(payload)
        .expect(404)
        .expect("Content-Type", /json/)
        .then(res => {
          // const apiResponse = ApiResponse.failed({
          //   statusCode: 404,
          //   errorCode: ErrorCodes.USER_NOT_FOUND,
          //   message: ErrorCodesMeta.USER_NOT_FOUND.message,
          //   data: { email: payload.email },
          // })

          // expect(res.body).toEqual(expect.objectContaining(apiResponse))
          expect(res.status).toEqual(400)
        })
    })
    it("should return a valid token", async () => {
      const payload = {
        email: ControllerTestUser[0].email,
        password: ControllerTestUser[0].password,
      }
      return request(app)
        .post("/user/login")
        .send(payload)
        .expect(200)
        .expect("Content-Type", /json/)
        .then(res => {
          // token = res.body.data.token
          // const apiResponse = ApiResponse.success({
          //   statusCode: 200,
          //   message: SuccessCodesMeta.User_AUTHORIZED_SUCCESSFULLY.message,
          //   data: { token: expect.any(String) },
          // })

          // expect(res.body).toEqual(expect.objectContaining(apiResponse))
          expect(res.status).toEqual(200)
        })
    })
  })
})
