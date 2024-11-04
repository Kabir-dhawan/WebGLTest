const avatarDAL = require('./avatarDAL');

const avatarService = {
    getAllAvatars: (callback) => {
        avatarDAL.getAll(callback);
    },

    getAvatarById: (id, callback) => {
        avatarDAL.getById(id, (err, avatar) => {
            if (err) return callback(err);
            if (!avatar) return callback(new Error('Avatar not found'));
            callback(null, avatar);
        });
    },

    createAvatar: (avatarData, callback) => {
        avatarDAL.create(avatarData, callback);
    },

    updateAvatar: (id, avatarData, callback) => {
        avatarDAL.update(id, avatarData, (err, updatedAvatar) => {
            if (err) return callback(err);
            if (!updatedAvatar) return callback(new Error('Failed to update avatar'));
            callback(null, updatedAvatar);
        });
    },

    deleteAvatar: (id, callback) => {
        avatarDAL.delete(id, (err, deletedAvatar) => {
            if (err) return callback(err);
            if (!deletedAvatar) return callback(new Error('Failed to delete avatar'));
            callback(null, deletedAvatar);
        });
    }
};

module.exports = avatarService;
