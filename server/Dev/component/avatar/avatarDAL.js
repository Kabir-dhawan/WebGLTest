const db = require('../../lib/db_connection');

const avatarDAL = {
    getAll: (callback) => {
        db.query('SELECT * FROM avatars', (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM avatars WHERE id = $1', [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0]);
        });
    },

    create: (avatarData, callback) => {
        const { image_url, rpm_id, file_name, avatar_url } = avatarData;
        console.log( 'image_url:', image_url, 'rpm_id:', rpm_id, 'file_name:', file_name);
    
        if ( !image_url || !rpm_id || !file_name || !avatar_url) {
            return callback(new Error('Missing required parameter(s)'));
        }
    
        // Check for duplicate rpm_id
        db.query('SELECT * FROM avatars WHERE rpm_id = $1', [rpm_id], (err, result) => {
            if (err) return callback(err);
    
            if (result.length > 0) {
                return callback(new Error('Avatar with this rpm_id already exists'));
            }
    
            // If no duplicate, proceed to insert
            db.query(
                `INSERT INTO avatars ( image_url, rpm_id, file_name, avatar_url) 
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [ image_url, rpm_id, file_name, avatar_url],
                (err, result) => {
                    if (err) return callback(err);
                    callback(null, result[0]);
                }
            );
        });
    },

    update: (id, avatarData, callback) => {
        const { image_url, rpm_id, file_name } = avatarData;
        db.query(
            `UPDATE avatars 
            SET image_url = $1, rpm_id = $2, file_name = $3 
            WHERE id = $4 RETURNING *`,
            [image_url, rpm_id, file_name, id],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result[0]);
            }
        );
    },

    delete: (id, callback) => {
        db.query('DELETE FROM avatars WHERE id = $1 RETURNING *', [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result[0]);
        });
    }
};

module.exports = avatarDAL;
