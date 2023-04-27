import DAOFactory from "../DAOs/DAOFactory.js";
import userDTO from "../DTOs/userDTO.js";
import UserModel from "../models/user.js";
import logger from "../utils/logger.js";

export default class UsersRepo {

	constructor() {

		this.dao = DAOFactory.getDao().userDAO

	}

	async getByUserName(username) {

		try {

			const userDto = await this.dao
				.getByUserName(username)
				
			return new UserModel(userDto)
				.datos();

		} catch (err) {

			logger.error(err);

		}

	}

	async insertUser(data) {
	
		try {
				
			let userDto = userDTO(data);
			
			let newUser = await this.dao
				.insertUser(userDto);
			
			return new UserModel(newUser).datos(); 

		} catch (err) {

			logger.error(err);

		}

	}

	async deleteById(id) {

		try {

			const data = await this.dao
				.deleteById(id);
			
			return data;

		} catch (err) {

			logger.error(err);

		}

	}

	async getAllUsers() {

		try {

			const data = await this.dao
				.getAllUsers();
			
			return data

		} catch (err) {

			logger.error(err);

		}

	}

	async getById(id) {
		
		try {

			const data = await this.dao
				.getById(id);
			
			return new UserModel(data).datos(); 

		}
		catch (err) {
			
			logger.error(err);

		}

	}

	async updateUser(id, data) {

		try {
			
			const newUser = await this.dao
				.updateUser(id, data);
			
			return newUser;

		} catch (err) {

			logger.error(err);

		}

	}

}


