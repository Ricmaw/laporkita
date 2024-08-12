import bcrypt from "bcrypt"; 
import db from "../database/knex.mjs";

const saltRounds = 10;

export default class User {
    
    // Membuat pengguna baru
    static async create({ password, ...data }) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const [{ id }] = await db("users")
            .insert({
                password: hashedPassword,
                ...data,
            })
            .returning("id");
        return { ...data, id };
    }
}
