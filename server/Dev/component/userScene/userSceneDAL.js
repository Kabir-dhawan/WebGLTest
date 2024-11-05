const db = require('../../lib/db_connection');

const userSceneDAL = {
    createUserScene: (userId, sceneId, callback) => {
        const query = `
            INSERT INTO user_scene (user_id, scene_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        db.query(query, [userId, sceneId], callback);
    },

    getUserScenes: (userId, callback) => {
        const query = `
            SELECT * FROM user_scene WHERE user_id = $1;
        `;
        db.query(query, [userId], callback);
    },

    createUserSceneSession: (userSceneId, qrCodeUrl, qrCodeExpiration, callback) => {
        const query = `
            INSERT INTO user_scene_session (user_scene_id, qr_code_url, qr_code_expiration)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        db.query(query, [userSceneId, qrCodeUrl, qrCodeExpiration], callback);
    },

    getUserSceneSessions: (userSceneId, callback) => {
        const query = `
            SELECT * FROM user_scene_session WHERE user_scene_id = $1;
        `;
        db.query(query, [userSceneId], callback);
    },

    mapAvatarToSession: (userSceneSessionId, avatarId, actorId, callback) => {
        const query = `
            INSERT INTO user_scene_session_avatars (user_scene_session_id, avatar_id, actor_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        db.query(query, [userSceneSessionId, avatarId, actorId], callback);
    }
};

module.exports = userSceneDAL;
