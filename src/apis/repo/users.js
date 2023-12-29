export default class UsersRepo {

	constructor(dao) {

		this.dao = dao

	}

	async registerUser(data) {

		try {

			let newUser = await this.dao
				.registerUser(data);

			return newUser;

		} catch (error) {

			throw (error)

		}

	}


	async getByUserName(username) {

		try {

			const userDto = await this.dao
				.getByUserName(username)

			return userDto

		} catch (error) {

			throw error

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

			const user = await this.dao
				.getById(id);

			return user

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


