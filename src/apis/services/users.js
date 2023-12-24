import logger from "../../utils/logger.js";
import { encryptPassword } from "../../utils/passwordUtils.js";
export default class UsersServices {

    constructor(repo) {

        this.repo = repo;

    }

    async getByUserName(username) {

        try {

            const user = await this.repo
                .getByUserName(username);

            return user;

        } catch (error) {

            throw error;
            
        }

    }

    async insertUser(data) {

        try {

            if (!data.username || !data.password || !data.nombre || !data.direccion || !data.edad || 100 >= data.edad <= 0 || isNaN(data.edad) || !data.telefono || !data.imagen) {

                return null

            }

            const newUser = await this.repo
                .insertUser(

                    {
                        ...data,
                        password: await encryptPassword(data.password)
                    }

                );

            return newUser;


        } catch (error) {

            throw error;

        }

    }

    async deleteById(id) {

        try {

            const data = await this.repo
                .deleteById(id);

            return data 

        } catch (error) {

            throw error;

        }

    }

    async getAllUsers() {

        try {

            const users = await this.repo
                .getAllUsers();

            return users;

        } catch (error) {

            throw error;

        }

    }

    async getById(id) {

        try {
            const data = await this.repo
                .getById(id);

                return data

        }
        catch (error) {

            throw error;

        }
    }

    async updateUser(id, data) {

        try {

            const updateUser = await this.repo
                .updateUser(id,
                    {
                        ...data,
                        password: await encryptPassword(data.password)
                    }
                );

            
            
            const updatedUser = await this.repo
                .getById(id);

            return {
                message: `Usuario ${id} actualizado con exito`,
                data: updatedUser
            };

        } catch (error) {

            throw error;

        }

    }

}
