const express = require('express')
const { 
    upload,
    uploadFile,
    getFiles,
    getFile,
    deleteFile
} = require('../controllers/bankController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Require Auth for all bank routes
router.use(requireAuth)

// GET all files
router.get('/upload', getFiles)

// GET a single file
router.get('/upload/:id', getFile)

// POST a file upload
router.post('/upload', upload.single('file'), uploadFile)

// DELETE a file
router.delete('/upload/:id', deleteFile)

module.exports = router