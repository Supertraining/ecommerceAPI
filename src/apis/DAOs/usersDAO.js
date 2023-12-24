import userDTO from '../DTOs/userDTO.js';
import createError from '../../utils/createErrorUtils.js';
import logger from '../../utils/logger.js';

let instance = null;

export default class UsersDAO {

	constructor(model) {
		this.model = model
	}

	async getByUserName(username) {

		try {

			let user = await this.model
				.findOne({ username: username });

			return user === null
				? user
				: userDTO(user)

		} catch (error) {

			throw error
		}

	}

	async insertUser(data) {

		try {

			let newUser = await this.model
				.insertMany(data);

			return userDTO(newUser[ 0 ]);

		} catch (error) {

			throw (error)

		}

	}

	async deleteById(id) {

		try {

			const user = await this.model
				.deleteMany({ _id: id });

			if (user.deletedCount === 0) {

				let error = createError(404, `Usuario con el Id: ${id} no encontrado`);
				throw error

			}

			return user;

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
			throw (error)

		}

	}

	async getAllUsers() {

		try {

			const data = await this.model
				.find();

			return data

		} catch (error) {

			throw (error)

		}

	}

	async getById(id) {

		try {

			const user = await this.model
				.findById(id);

			if (!user) {

				let error = createError(404, `Usuario con el Id: ${id} no encontrado`);
				throw error

			}

			return userDTO(user);

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
			throw (error)

		}
	}

	async updateUser(id, data) {

		try {

			const updatedUser = await this.model
				.updateMany({ _id: id }, data);

			if (updatedUser.matchedCount === 0) {

				let error = createError(404, `Usuario con el Id: ${id} no encontrado`);

				throw error

			}
			if (updatedUser.modifiedCount === 0 && updatedUser.matchedCount === 1) {

				let error = createError(400, `Usuario con el Id: ${id} no ha sido modificado`);

				throw error

			}


			return updatedUser;

		} catch (error) {

			if (error.kind === 'ObjectId') {
				let error = createError(400, 'Id incorrecta')
				throw error
			}
			throw (error)

		}

	}

	static getInstance(model) {
		try {

			if (!instance) {

				instance = new UsersDAO(model);

				logger.info('Se ha creado una instancia de UsersDAO');

			} else {
				logger.info('Se ha utilizado una instancia ya creada de usersDAO');
			}

			return instance;

		} catch (error) {

			throw (error)

		}

	}

}


