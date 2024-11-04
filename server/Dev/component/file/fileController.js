// src/routes/fileController.js
//const express = require('express');
const fileService = require('./fileService');
const settings = require('../../lib/settings');
const path = require('path');

module.exports = function (router) {
    // Route for uploading a file
    router.route('/uploadFile')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin', settings.serverSettings.clientOrigin);
            next();
        })
        .post(async (req, res) => {
            try {
                console.log('file upload');
                const result = await fileService.uploadFile(req, res);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            }
        });

    // Route for removing a file
    router.route('/fileRemover')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin', settings.serverSettings.clientOrigin);
            next();
        })
        .post(async (req, res) => {
            const { filename } = req.body;
            try {
                const result = await fileService.deleteFile(filename);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json(error);
            }
        });

         // Route for retrieving and sending a file as response using GET request
        router.route('/getFile')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Access-Control-Allow-Origin', settings.serverSettings.clientOrigin);
            next();
        })
        .get(async (req, res) => {
            const filename = req.query.filename; // Get filename from query parameter
            try {
                const filePath = await fileService.getFilePath(filename);
                //console.log(filePath);
                if(path.extname(filename) == '')
                    filename += '.glb';
                res.download(filePath, filename, (error) => {
                    if (error) {
                        res.status(500).json({ status: 0, message: 'Error sending file', error: error.message });
                    }
                });
            } catch (error) {
                res.status(404).json(error);
            }
        });

    // POST /uploadByUrl - Upload file by URL
    router.route('/uploadByUrl')
    .post(async (req, res) => {
        const { fileUrl } = req.body;
        console.log(fileUrl);
        if (!fileUrl) {
            return res.status(400).json({
                status: 0,
                message: 'File URL is required'
            });
        }

        try {
            const filename = path.basename(fileUrl); // Extract the filename from the URL
            console.log(fileUrl, filename);
            const savePath = path.join(__dirname, '../../uploads', filename); // Save in the uploads directory
            console.log(fileUrl, savePath);
            const result = await fileService.downloadFile(fileUrl, savePath);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: 0,
                message: 'Error uploading file',
                error: error.message
            });
        }
    });
};


