// src/services/avatarService.js
import ApiService from './apiService';

const avatarService = {
    getAllAvatars: () => {
        return ApiService.get('/avatars')
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching avatars:', error);
                throw error;
            });
    },

    getAvatarById: (id) => {
        return ApiService.get(`/avatars/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error fetching avatar with ID ${id}:`, error);
                throw error;
            });
    },

    createAvatar: (avatarData) => {
        return ApiService.post('/avatars', avatarData)
            .then((response) => {
                //const { id, avatar_url } = response.data.data; // Assuming API response structure
                // if (avatar_url) {
                //     return ApiService.post('/uploadByUrl', { fileUrl: avatar_url })
                //         .then(() => response.data) // Return the initial avatar response
                //         .catch(error => {
                //             console.error('Error uploading avatar by URL:', error);
                //             throw error;
                //         });
                // }
                return response.data; // If no URL, just return the created avatar data
            })
            .catch(error => {
                console.error('Error creating avatar:', error);
                throw error;
            });
    },

    updateAvatar: (id, avatarData) => {
        return ApiService.put(`/avatars/${id}`, avatarData)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error updating avatar with ID ${id}:`, error);
                throw error;
            });
    },

    deleteAvatar: (id) => {
        return ApiService.delete(`/avatars/${id}`)
            .then(response => response.data)
            .catch(error => {
                console.error(`Error deleting avatar with ID ${id}:`, error);
                throw error;
            });
    },
    uploadAvatar:(avatarUrl)=>{
        return ApiService.post('/uploadByUrl', { fileUrl: avatarUrl })
        .then(() => response.data) // Return the initial avatar response
        .catch(error => {
            console.error('Error uploading avatar by URL:', error);
            throw error;
        });
    },
    getAllAvatarsBySession: (session) => {
        return ApiService.get(`user-scene-sessions/${session}/avatars`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching avatars:', error);
                throw error;
            });
    },
};

export default avatarService;
