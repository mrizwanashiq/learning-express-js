import UserModel from "../models/user.js"

const UserService = {
    getAll: async () => {
        const data = await UserModel.find();
        return { message: "success", data }
    },
    getById: async (id) => {
        const data = await UserModel.findById(id);
        return { message: "success", data }
    },
    add: async (body) => {
        const data = await UserModel.create(body);
        return { message: "success", data }
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