// src/components/avatar/avatarRoutes.js
const avatarService = require('./avatarService'); // Assuming avatarService is defined and implemented

module.exports = function (router) {

    // GET /avatars - Fetch all avatars
    router.route('/avatars')
        .get(async (req, res) => {
            try {
                const avatars = await avatarService.getAllAvatars();
                res.status(200).json({
                    status: 1,
                    message: 'Avatars retrieved successfully',
                    data: avatars
                });
            } catch (err) {
                res.status(500).json({
                    status: 0,
                    message: 'Error retrieving avatars',
                    error: err.message
                });
            }
        })
        // POST /avatars - Create a new avatar
        .post(async (req, res) => {
            try {
                const newAvatar = await avatarService.createAvatar(req.body);
                res.status(201).json({
                    status: 1,
                    message: 'Avatar created successfully',
                    data: newAvatar
                });
            } catch (err) {
                res.status(500).json({
                    status: 0,
                    message: 'Error creating avatar',
                    error: err.message
                });
            }
        });

    // PUT /avatars/:id - Update an avatar by ID
    router.route('/avatars/:id')
        .put(async (req, res) => {
            try {
                const updatedAvatar = await avatarService.updateAvatar(req.params.id, req.body);
                if (!updatedAvatar) {
                    return res.status(404).json({ status: 0, message: 'Avatar not found' });
                }
                res.status(200).json({
                    status: 1,
                    message: 'Avatar updated successfully',
                    data: updatedAvatar
                });
            } catch (err) {
                res.status(500).json({
                    status: 0,
                    message: 'Error updating avatar',
                    error: err.message
                });
            }
        })
        // DELETE /avatars/:id - Delete an avatar by ID
        .delete(async (req, res) => {
            try {
                const deletedAvatar = await avatarService.deleteAvatar(req.params.id);
                if (!deletedAvatar) {
                    return res.status(404).json({ status: 0, message: 'Avatar not found' });
                }
                res.status(200).json({
                    status: 1,
                    message: 'Avatar deleted successfully',
                    data: deletedAvatar
                });
            } catch (err) {
                res.status(500).json({
                    status: 0,
                    message: 'Error deleting avatar',
                    error: err.message
                });
            }
        });

    return router;
};
