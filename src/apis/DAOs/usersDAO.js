import logger from '../../utils/logger.js';
import userDTO from '../DTOs/userDTO.js';

let instance = null;

export default class UsersDAO {

	constructor(model) {
		this.model = model
	}

	async getByUserName(username) {

		try {

			let data = await this.model
				.find({ username: username });

			return userDTO(data);

		} catch (err) {

			logger.error(err);

		}

	}

	async insertUser(data) {

		try {

			let newUser = await this.model
				.insertMany(data);

			return userDTO(newUser);

		} catch (err) {

			logger.error(err);

		}

	}

	async deleteById(id) {

		try {

			const data = await this.model
				.deleteMany({ _id: id });

			return data;

		} catch (err) {

			logger.error(err);

		}

	}

	async getAllUsers() {

		try {

			const data = await this.model
				.find();

			return data

		} catch (err) {

			logger.error(err);

		}

	}

	async getById(id) {

		try {

			const data = await this.model
				.findById(id);

			return userDTO(data);

		} catch (err) {

			logger.error(err);

		}
	}

	async updateUser(id, data) {

		try {

			const updateUser = await this.model
				.updateMany({ _id: id }, data);

			return updateUser;

		} catch (err) {

			logger.error(err);

		}

	}

	static getInstance(model) {
		try {
			if (!instance) {

				instance = new UsersDAO(model);

				logger.info('Se ha creado una instancia de UsersDAO');

			}

			logger.info('Se ha utilizado una instancia ya creada de usersDAO');

			return instance;

		} catch (error) {

			logger.error(error);

		}

	}

}


