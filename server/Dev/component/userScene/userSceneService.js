const userSceneDAL = require('./userSceneDAL');

const userSceneService = {
    createUserScene: (userId, sceneId, callback) => {
        userSceneDAL.createUserScene(userId, sceneId, callback);
    },

    getUserScenes: (userId, callback) => {
        userSceneDAL.getUserScenes(userId, callback);
    },

    createUserSceneSession: (userSceneId, qrCodeUrl, qrCodeExpiration, callback) => {
        userSceneDAL.createUserSceneSession(userSceneId, qrCodeUrl, qrCodeExpiration, callback);
    },

    getUserSceneSessions: (userSceneId, callback) => {
        userSceneDAL.getUserSceneSessions(userSceneId, callback);
    },

    mapAvatarToSession: (userSceneSessionId, avatarId, actorId, callback) => {
        userSceneDAL.mapAvatarToSession(userSceneSessionId, avatarId, actorId, callback);
    }
};

module.exports = userSceneService;
