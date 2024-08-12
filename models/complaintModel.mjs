import db from "../database/knex.mjs";

export default class Complaint {
    // Membuat keluhan baru
    static async create(data) {
        const [id] = await db("complaints")
            .insert(data)
            .returning("id");
        return { id, ...data };
    }

    // Mendapatkan semua keluhan
    static async getAll() {
        return await db("complaints").select("*");
    }

    // Mengupdate keluhan berdasarkan ID
    static async update(id, data) {
        const [updatedComplaint] = await db("complaints")
            .where({ id })
            .update(data)
            .returning("*");
        return updatedComplaint;
    }

    // Menghapus keluhan berdasarkan ID
    static async delete(id) {
        const deletedCount = await db("complaints").where({ id }).del();
        return deletedCount > 0;
    }
}
