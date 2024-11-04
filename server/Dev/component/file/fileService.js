// src/services/fileService.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');


// Configure multer storage with the original filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads/');
        cb(null, uploadPath); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        // Save file with its original name and extension
        cb(null, file.originalname);
    }
});

// Configure multer for file uploads, specifying the allowed file types and file size limits
const upload = multer({
    dest: 'uploads/', // Directory to store uploaded files
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter: (req, file, cb) => {
        // Allow only .glb files
        if (file.mimetype === 'model/gltf-binary' || file.originalname.endsWith('.glb')) {
            cb(null, true);
        } else {
            cb(new Error('Only .glb files are allowed!'), false);
        }
    }
});

// Function to handle file upload
const uploadFile = (req, res) => {
    return new Promise((resolve, reject) => {
        upload.single('file')(req, res, (error) => {
            console.log(error);
            if (error) {
                reject({ status: 0, message: 'File upload failed', error: error.message });
            } else if (!req.file) {
                reject({ status: 0, message: 'No file uploaded' });
            } else {
                // File upload successful
                resolve({
                    status: 1,
                    message: 'File uploaded successfully',
                    data: {
                        filename: req.file.filename,
                        originalname: req.file.originalname,
                        path: req.file.path
                    }
                });
            }
        });
    });
};

// Function to handle file deletion
const deleteFile = (filename) => {
    return new Promise((resolve, reject) => {
        if (!filename) {
            return reject({ status: 0, message: 'Filename is required' });
        }

        const filePath = path.join(__dirname, '../../uploads', filename);

        fs.unlink(filePath, (error) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    // File does not exist
                    reject({ status: 0, message: 'File not found' });
                } else {
                    // Other errors
                    reject({ status: 0, message: 'Error deleting file', error: error.message });
                }
            } else {
                resolve({ status: 1, message: 'File deleted successfully' });
            }
        });
    });
};

// Check if a file exists and return its path
const getFilePath = (filename) => {
    return new Promise((resolve, reject) => {
        if (!filename) {
            return reject({ status: 0, message: 'Filename is required' });
        }

        const filePath = path.join(__dirname, '../../uploads', filename);

        fs.access(filePath, fs.constants.F_OK, (error) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    reject({ status: 0, message: 'File not found' });
                } else {
                    reject({ status: 0, message: 'Error accessing file', error: error.message });
                }
            } else {
                resolve(filePath); // Return the file path if it exists
            }
        });
    });
};

const downloadFile = async (fileUrl, savePath) => {
    try {
        // Fetch the file from the URL
        const response = await axios({
            method: 'GET',
            url: fileUrl,
            responseType: 'stream'
        });

        // Ensure the uploads directory exists
        const dir = path.dirname(savePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Pipe the response data to a file
        const writer = fs.createWriteStream(savePath);
        response.data.pipe(writer);

        // Return a promise that resolves when the file is successfully written
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve({ status: 1, message: 'File downloaded successfully' }));
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading file:', error.message);
        throw { status: 0, message: 'Error downloading file', error: error.message };
    }
};

module.exports = {
    uploadFile,
    deleteFile,
    getFilePath,
    downloadFile
};
