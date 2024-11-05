
const userSceneService = require('./userSceneService');
module.exports = function (router) {
 
router.route('/user-scenes')
.post( (req, res) => {
    const { userId, sceneId } = req.body;
    console.log(userId, sceneId);
    userSceneService.createUserScene(userId, sceneId, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ status: 0, message: err.message });
        }
        res.status(201).json({ status: 1, data: result });
    });
});

router.route('/user-scenes/:userId')
.get( (req, res) => {
    const { userId } = req.params;
    userSceneService.getUserScenes(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err.message });
        }
        res.status(200).json({ status: 1, data: result });
    });
});

router.route('/user-scene-sessions')
.post((req, res) => {
    const { userSceneId, qrCodeUrl, qrCodeExpiration } = req.body;
    userSceneService.createUserSceneSession(userSceneId, qrCodeUrl, qrCodeExpiration, (err, result) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err.message });
        }
        res.status(201).json({ status: 1, data: result });
    });
});

router.route('/user-scene-sessions/:userSceneId')
.get( (req, res) => {
    const { userSceneId } = req.params;
    userSceneService.getUserSceneSessions(userSceneId, (err, result) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err.message });
        }
        res.status(200).json({ status: 1, data: result });
    });
});

router.route('/user-scene-session-avatars')
.post( (req, res) => {
    const { userSceneSessionId, avatarId, actorId } = req.body;
    userSceneService.mapAvatarToSession(userSceneSessionId, avatarId, actorId, (err, result) => {
        if (err) {
            return res.status(500).json({ status: 0, message: err.message });
        }
        res.status(201).json({ status: 1, data: result });
    });
});

return router;
};

