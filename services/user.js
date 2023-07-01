import UserModel from "../models/user.js";

const UserService = {
	getAll: () => {
		return UserModel.find();
	},
	getById: (id) => {
		return UserModel.findById(id);
	},
	add: (body) => {
		return UserModel.create(body);
	},
	update: async ({ id, ...body }) => {
		await UserModel.findByIdAndUpdate(id, body);
		return UserModel.findById(id);
	},
	delete: (id) => {
		return UserModel.findByIdAndRemove(id);
	},
};

export default UserService;
