require("reflect-metadata")
import request from "supertest"
import UserModel from "../models/user"
import mongoose from 'mongoose'
import app from '../index.js'
import { ControllerTestUser } from "../content/helpers"

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await UserModel.deleteMany({});
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send(ControllerTestUser[0]);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(ControllerTestUser[0].name);
  });

  it('should retrieve all users', async () => {
    await UserModel.create(ControllerTestUser[0]);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(ControllerTestUser[0].name);
  });

  it('should retrieve a user by ID', async () => {
    const createdUser = await UserModel.create(ControllerTestUser[0]);

    const response = await request(app).get(`/users/${createdUser._id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(ControllerTestUser[0].name);
  });

  it('should update a user by ID', async () => {
    const createdUser = await UserModel.create(ControllerTestUser[0]);

    const response = await request(app)
      .patch(`/users/${createdUser._id}`)
      .send({ name: 'Updated User' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated User');
  });

  it('should delete a user by ID', async () => {
    const createdUser = await UserModel.create(ControllerTestUser[0]);

    const response = await request(app).delete(`/users/${createdUser._id}`);

    expect(response.status).toBe(204);

    const deletedUser = await UserModel.findById(createdUser._id);
    expect(deletedUser).toBeNull();
  });
});

