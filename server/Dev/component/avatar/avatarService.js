// src/components/avatar/avatarService.js
const avatarDAL = require('./avatarDAL');

const avatarService = {
    getAllAvatars: async () => {
        return await avatarDAL.getAll();
    },

    getAvatarById: async (id) => {
        const avatar = await avatarDAL.getById(id);
        if (!avatar) throw new Error('Avatar not found');
        return avatar;
    },

    createAvatar: async (avatarData) => {
        return await avatarDAL.create(avatarData);
    },

    updateAvatar: async (id, avatarData) => {
        const updatedAvatar = await avatarDAL.update(id, avatarData);
        if (!updatedAvatar) throw new Error('Failed to update avatar');
        return updatedAvatar;
    },

    deleteAvatar: async (id) => {
        const deletedAvatar = await avatarDAL.delete(id);
        if (!deletedAvatar) throw new Error('Failed to delete avatar');
        return deletedAvatar;
    }
};

module.exports = avatarService;
