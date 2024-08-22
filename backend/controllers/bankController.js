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

const isValidDescription = (description) => description && description.length >= 20;
const isValidAmount = (amount) => /^-\d+(\.\d{0,2})?$/.test(amount);
const isValidDate = (date) => /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(date);

const columnMappings = {
    'date': ['date', 'transaction_date', 'Date', 'Posting_Date', /^\d{1,2}\/\d{1,2}\/\d{2,4}$/],
    'description': ['description', 'details', 'Notes', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\s).{20,}$/],
    'amount': ['amount', 'value', 'Amount', /^-?\d+(\.\d{0,2})?$/]
};

const inferColumnTypes = (headers, row) => {
    const inferredColumns = { date: null, description: null, amount: null };

    headers.forEach((header) => {
        const value = row[header];

        if (isValidDate(value)) {
            inferredColumns.date = header;
        } else if (isValidAmount(value)) {
            inferredColumns.amount = header;
        } else if (isValidDescription(value)) {
            inferredColumns.description = header;
        }
    });

    return inferredColumns;
};

const columnsMatchMapping = (headers, columnMapping) => {
    return Object.keys(columnMapping).every((key) => {
        const column = columnMapping[key];
        return headers.includes(column) || (column instanceof RegExp && headers.some(h => column.test(h)));
    });
};

const getColumnMapping = (headers) => {
    const mapping = {};

    headers.forEach(header => {
        for (const [field, possibleHeaders] of Object.entries(columnMappings)) {
            if (possibleHeaders.some(h => (typeof h === 'string' ? header.toLowerCase() === h.toLowerCase() : h.test(header)))) {
                mapping[field] = header;
                break;
            }
        }
    });

    return mapping;
};

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No File Uploaded');
    }

    const user_id = req.user._id;
    const filePath = req.file.path;
    const file = [];

    let headers = [];
    let inferredColumns = {};
    let columnMapping = {};

    const readStream = fs.createReadStream(filePath)
        .pipe(csv());

    readStream
        .on('headers', (csvHeaders) => {
            headers = csvHeaders;
            console.log('Headers:', headers);
        })
        .on('data', (data) => {
            if (Object.keys(columnMapping).length === 0) {
                columnMapping = getColumnMapping(headers);

                if (!columnsMatchMapping(headers, columnMapping)) {
                    console.log('Headers do not match expected column mapping, inferring columns from data...');
                    inferredColumns = inferColumnTypes(headers, data);
                    console.log('Inferred Columns:', inferredColumns);
                } else {
                    console.log('Matching Column Mapping:', columnMapping);

                    if (!isValidDescription(columnMapping.description)) {
                        console.warn(`Skipping entry with invalid description: ${columnMapping.description}`);
                        return;
                    }

                    if (!isValidAmount(columnMapping.amount)) {
                        console.warn(`Skipping entry with invalid amount: ${columnMapping.amount}`);
                        return;
                    }

                    if (!isValidDate(columnMapping.date)) {
                        console.warn(`Skipping entry with invalid date: ${columnMapping.date}`);
                        return;
                    }

                    const [month, day, year] = columnMapping.date.split('/').map(Number);
                    const parsedDate = new Date(year, month - 1, day);

                    const mappedData = {
                        user_id: user_id,
                        description: columnMapping.description,
                        amount: parseFloat(columnMapping.amount),
                        date: parsedDate
                    };

                    file.push(mappedData);
                }
            }

            const columnsToUse = Object.keys(columnMapping).length ? columnMapping : inferredColumns;

            if (!columnsToUse.date || !columnsToUse.description || !columnsToUse.amount) {
                console.error('Cannot determine necessary columns');
                return;
            }

            const description = data[columnsToUse.description];
            const amount = data[columnsToUse.amount];
            const date = data[columnsToUse.date];

            console.log('Parsed Data:', {
                description,
                amount,
                date
            });

            if (!isValidDescription(description)) {
                console.warn(`Skipping entry with invalid description: ${description}`);
                return;
            }

            if (!isValidAmount(amount)) {
                console.warn(`Skipping entry with invalid amount: ${amount}`);
                return;
            }

            if (!isValidDate(date)) {
                console.warn(`Skipping entry with invalid date: ${date}`);
                return;
            }

            const [month, day, year] = date.split('/').map(Number);
            const parsedDate = new Date(year, month - 1, day);

            const mappedData = {
                user_id: user_id,
                description: description,
                amount: parseFloat(amount),
                date: parsedDate
            };

            file.push(mappedData);
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