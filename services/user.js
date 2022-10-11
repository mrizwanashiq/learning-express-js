import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'

const UserService = {
    getAll: async () => {
        const data = await UserModel.find();
        return { message: "success", data }
    },
    getById: async (id) => {
        const data = await UserModel.findById(id);
        return { message: "success", data }
    },
    register: async (body) => {
        const isExists = await UserModel.findOne({ email: body.email })

        if (isExists) {
            throw ({ status: 401, message: "User already exists" })
        }

        const data = await UserModel.create(body);
        return { message: "success", data }
    },
    login: async (body) => {
        const isExists = await UserModel.findOne({ email: body.email, password: body.password })

        if (!isExists) {
            throw ({ status: 404, message: "User not found with this email and password" })
        }
        const data = await UserModel.create(body);
        const token = jwt.sign(data._doc, "my_secret",)
        return { message: "success", token }
    },
    update: async ({ id, ...body }) => {
        const data = await UserModel.findByIdAndUpdate(id, body);
        return { message: "success", data }
    },
    delete: async (id) => {
        const data = await UserModel.findByIdAndRemove(id);
        return { message: "success", data }
    }
}

export default UserService;