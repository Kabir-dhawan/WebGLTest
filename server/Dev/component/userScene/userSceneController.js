const userSceneService = require('./userSceneService');

module.exports = function (router) {

    // Route to create a new user-scene mapping
    router.route('/user-scenes')
        .post((req, res) => {
            const { userId, sceneId } = req.body;
            userSceneService.createUserScene(userId, sceneId, (err, result) => {
                if (err) {
                    return res.status(500).json({ status: 0, message: err.message });
                }
                res.status(201).json({ status: 1, data: result });
            });
        });

    // Route to get all scenes for a specific user
    router.route('/user-scenes/:userId')
        .get((req, res) => {
            const { userId } = req.params;
            userSceneService.getUserScenes(userId, (err, result) => {
                if (err) {
                    return res.status(500).json({ status: 0, message: err.message });
                }
                res.status(200).json({ status: 1, data: result });
            });
        });

    // Route to create a new session for a user-scene
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

    // Route to get all sessions for a specific user-scene
    router.route('/user-scene-sessions/:userSceneId')
        .get((req, res) => {
            const { userSceneId } = req.params;
            userSceneService.getUserSceneSessions(userSceneId, (err, result) => {
                if (err) {
                    return res.status(500).json({ status: 0, message: err.message });
                }
                res.status(200).json({ status: 1, data: result });
            });
        });

    // Route to map an avatar to a specific user-scene session
    router.route('/user-scene-session-avatars')
        .post((req, res) => {
            const { userSceneSessionId, avatarId, actorId } = req.body;
            userSceneService.mapAvatarToSession(userSceneSessionId, avatarId, actorId, (err, result) => {
                if (err) {
                    return res.status(500).json({ status: 0, message: err.message });
                }
                res.status(201).json({ status: 1, data: result });
            });
        });

    // Route to get all avatars associated with a specific session
    router.route('/user-scene-sessions/:sessionId/avatars')
        .get((req, res) => {
            const { sessionId } = req.params;
            userSceneService.getAvatarsForSession(sessionId, (err, result) => {
                if (err) {
                    return res.status(500).json({ status: 0, message: err.message });
                }
                res.status(200).json({ status: 1, data: result });
            });
        });

    // Endpoint to create a user scene session and map avatars to it
    router.route('/user-scenes/create-session-with-avatars')
        .post((req, res) => {
            const { userSceneId, qrCodeUrl, qrCodeExpiration, avatars } = req.body;

            if (!userSceneId || !avatars || avatars.length === 0) {
                return res.status(400).json({
                    status: 0,
                    message: "userSceneId and avatars are required."
                });
            }

            // Step 1: Create the user scene session
            userSceneService.createUserSceneSession(userSceneId, qrCodeUrl, qrCodeExpiration, (err, sessionResult) => {
                if (err) {
                    console.error("Error creating session:", err);
                    return res.status(500).json({ status: 0, message: "Failed to create session", error: err.message });
                }

                // Log the session result to verify its structure
                console.log("Session Result:", sessionResult);

                // Check if sessionResult has the expected id
                const userSceneSessionId = (sessionResult&&sessionResult.length)??sessionResult[0].id;
                //const userSceneSessionId = sessionResult?.id;
                if (!userSceneSessionId) {
                    return res.status(500).json({ status: 0, message: "Session creation succeeded but no session ID returned" });
                }

                // Step 2: Map avatars to the created session
                const avatarMappingPromises = avatars.map(({ avatarId, actorId }) =>
                    new Promise((resolve, reject) => {
                        userSceneService.mapAvatarToSession(userSceneSessionId, avatarId, actorId, (err, mapResult) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(mapResult);
                            }
                        });
                    })
                );

                // Execute all avatar mappings
                Promise.all(avatarMappingPromises)
                    .then(mappedAvatars => {
                        res.status(201).json({
                            status: 1,
                            message: "Session and avatar mappings created successfully",
                            data: {
                                session: sessionResult,
                                avatars: mappedAvatars
                            }
                        });
                    })
                    .catch(error => {
                        console.error("Error mapping avatars:", error);
                        res.status(500).json({
                            status: 0,
                            message: "Error mapping avatars to session",
                            error: error.message
                        });
                    });
            });
        });

    return router;
};
