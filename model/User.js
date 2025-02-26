const db = require("../config/DB");

module.exports = class UserModel {
    constructor() {}

    static async getAll() {
        try {

            const [res] = await db.execute(`SELECT user.* FROM user`);
            if (res.length > 0) return {
                success: true,
                data: res
            };

            return {
                success: true,
                message: "Aucun utilisateur trouvé",
                data: [],
            };
        } catch (error) {
            console.log("error => ", error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    static async findById(id) {

        try {
            const [res] = await db.execute(`select user.* from user where id = ?`, [id]);

            if (res.length > 0) return res[0];
            return null;
        } catch (error) {
            return error;
        }
    }

    static async getUserByUsername(username) {

        try {

            const [res] = await db.execute(`select user.* from user where username = ?`, [username]);

            if (res.length > 0) return res[0];
            return null;
        } catch (error) {
            return error;
        }
    }

    static async getUserById(id) {
        try {
            const sql = `select user.* from user where id = ?`;

            const [res] = await db.execute(sql, [id]);
            if (res.length > 0)
                return {
                    success: true,
                    data: res[0]
                };
            return {
                success: false,
                message: "No user found",
                data: []
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            }
        }
    }

    static async checkUsername(username) {
        try {
            const sql = `select user.* from user where username = ?`;

            const [res] = await db.execute(sql, [username]);
            if (res.length > 0) return true;
            return false;
        } catch (error) {
            return error;
        }
    }

};