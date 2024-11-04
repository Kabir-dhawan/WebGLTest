const avatarService = require('./avatarService');

module.exports = function (router) {

    // GET /avatars - Fetch all avatars
    router.route('/avatars')
        .get((req, res) => {
            avatarService.getAllAvatars((err, avatars) => {
                if (err) {
                    return res.status(500).json({
                        status: 0,
                        message: 'Error retrieving avatars',
                        error: err.message
                    });
                }
                res.status(200).json({
                    status: 1,
                    message: 'Avatars retrieved successfully',
                    data: avatars
                });
            });
        })
        .post((req, res) => {
            avatarService.createAvatar(req.body, (err, newAvatar) => {
                if (err) {
                    return res.status(500).json({
                        status: 0,
                        message: 'Error creating avatar',
                        error: err.message
                    });
                }
                res.status(201).json({
                    status: 1,
                    message: 'Avatar created successfully',
                    data: newAvatar
                });
            });
        });

    // PUT /avatars/:id - Update an avatar by ID
    router.route('/avatars/:id')
        .put((req, res) => {
            avatarService.updateAvatar(req.params.id, req.body, (err, updatedAvatar) => {
                if (err) {
                    return res.status(500).json({
                        status: 0,
                        message: 'Error updating avatar',
                        error: err.message
                    });
                }
                if (!updatedAvatar) {
                    return res.status(404).json({ status: 0, message: 'Avatar not found' });
                }
                res.status(200).json({
                    status: 1,
                    message: 'Avatar updated successfully',
                    data: updatedAvatar
                });
            });
        })
        .delete((req, res) => {
            avatarService.deleteAvatar(req.params.id, (err, deletedAvatar) => {
                if (err) {
                    return res.status(500).json({
                        status: 0,
                        message: 'Error deleting avatar',
                        error: err.message
                    });
                }
                if (!deletedAvatar) {
                    return res.status(404).json({ status: 0, message: 'Avatar not found' });
                }
                res.status(200).json({
                    status: 1,
                    message: 'Avatar deleted successfully',
                    data: deletedAvatar
                });
            });
        });

    return router;
};
