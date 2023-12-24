import userDTO from "../DTOs/userDTO.js";
import UserModel from "../../models/user.js";

export default class UsersRepo {

	constructor(dao) {

		this.dao = dao

	}

	async getByUserName(username) {

		try {

			const userDto = await this.dao
				.getByUserName(username)

			return userDto === null
				? userDto
				: new UserModel(userDto)
					.datos();

		} catch (error) {

			throw error

		}

	}

	async insertUser(data) {

		try {

			let userDto = userDTO(data);

			let newUser = await this.dao
				.insertUser(userDto);

			return new UserModel(newUser).datos();

		} catch (error) {

			throw (error)

		}

	}

	async deleteById(id) {

		try {

			const data = await this.dao
				.deleteById(id);

			return data;

		} catch (error) {

			throw (error)

		}

	}

	async getAllUsers() {

		try {

			const data = await this.dao
				.getAllUsers();

			return data

		} catch (error) {

			throw (error)

		}

	}

	async getById(id) {

		try {

			const data = await this.dao
				.getById(id);

			return new UserModel(data).datos();

		}
		catch (error) {

			throw (error)

		}

	}

	async updateUser(id, data) {

		try {

			const newUser = await this.dao
				.updateUser(id, data);

			return newUser;

		} catch (error) {

			throw (error)

		}

	}

}


