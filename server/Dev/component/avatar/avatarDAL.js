// src/components/avatar/avatarDAL.js
const db = require('../../lib/db_connection');

const avatarDAL = {
    getAll: async () => {
        const result = await db.query('SELECT * FROM avatars');
        return result.rows;
    },

    getById: async (id) => {
        const result = await db.query('SELECT * FROM avatars WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (avatarData) => {
        const { actor_id, image_url, rpm_id, file_name } = avatarData;
        console.log(actor_id, image_url, rpm_id, file_name);
        const result = await db.query(
            `INSERT INTO avatars (actor_id, image_url, rpm_id, file_name) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [actor_id, image_url, rpm_id, file_name]
        );
        return result.rows[0];
    },

    update: async (id, avatarData) => {
        const { image_url, rpm_id, file_name } = avatarData;
        const result = await db.query(
            `UPDATE avatars 
            SET image_url = $1, rpm_id = $2, file_name = $3 
            WHERE id = $4 RETURNING *`,
            [image_url, rpm_id, file_name, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await db.query('DELETE FROM avatars WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = avatarDAL;
