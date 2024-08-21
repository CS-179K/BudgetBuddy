const Bank = require('../models/bankModel')
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'banks/'),
    filename: (req, file, cb) => cb(null, file.fieldname) + '-' + Date.now() + path.extname(file.originalname)
})

const upload = multer ({ storage: storage });

// Get all of the transactions
const getFiles = async (req, res) => {
    const user_id = req.user._id

    const files = await Bank.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(files)
}

const getFile = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such file'})
    }

    const file = await Bank.findById(id)

    if (!file) {
        return res.status(404).json({error: 'No such file'})
    }

    res.status(200).json(file)
}

// Upload a single file
const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No File Uploaded')
    }

    const user_id = req.user._id
    const filePath = req.file.path
    const file = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            file.push({
                user_id: user_id,
                description: data.description,
                amount: parseFloat(data.amount),
                date: new Date(data.date)
            });
        })
        .on('end', () => {
            Bank.insertMany(file)
                .then(() => res.status(200).send('CSV data imported successfully'))
                .catch((error) => res.status(500).send('Error importing CSV data: ' + error.message));
        })
        .on('error', (error) => {
            res.status(500).send('Error reading file: ' + error.message);
        });
};

const deleteFile = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such file'})
    }

    const file = await Bank.findOneAndDelete({_id: id})

    if (!file) {
        return res.status(400).json({error: 'No such file'})
    }

    res.status(200).json(file)
}

module.exports = { 
    upload, 
    uploadFile,
    getFiles,
    getFile,
    deleteFile
};