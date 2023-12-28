import createError from "../../utils/createErrorUtils.js";
import { authenticatePassword, encryptPassword } from "../../utils/passwordUtils.js";
import { createToken } from "../../utils/tokenUtils.js";
export default class UsersServices {

    constructor(repo, cartService) {

        this.repo = repo;
        this.cartService = cartService

    }

    async registerUser(data) {

        try {
            
            const {_id} = await this.cartService.createCart()
            
            const newUser = await this.repo
                .registerUser(

                    {
                        ...data,
                        role: data.role || 'user',
                        cartId: _id,
                        password: await encryptPassword(data.password)
                    }

                );

            return newUser;


        } catch (error) {

            throw error;

        }

    }

    async login(username, password) {


        const user = await this.getByUserName(username);
        
        const PasswordMatch = await authenticatePassword(password, user);

        if (!PasswordMatch) {
            let error = createError(400, 'Wrong password');
            throw error;
        }

        const { password: userPassword, ...safeUserInfo } = user; 
     
        const signedToken = await createToken(safeUserInfo);

        return signedToken;

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
