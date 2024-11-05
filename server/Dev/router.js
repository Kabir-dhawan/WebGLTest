const express = require('express');
const userController = require('./component/user/userController');
const avatarController = require('./component/avatar/avatarController');
const fileController = require('./component/file/fileController');
const userSceneController = require('./component/userScene/userSceneController');


var Router = express.Router();

module.exports = Router;



Router = userController(Router);
Router = avatarController(Router);
Router = fileController (Router);
Router = userSceneController(Router);
