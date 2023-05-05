const multer = require('multer');

// storages
const pdfCVStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/pdf');
    },
    filename: ((req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    })
});

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/excel');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

//filters
const pdfFileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/pdf') {
        cb(null, true);
    }
    else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

const imageFileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const excelFileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    }
    else {
        cb(new Error('Only Excel files are allowed'), false);
    }
};

const cvUpload = multer({ storage: pdfCVStorage, fileFilter: pdfFileFilter}).single('cv-file');
const imageUpload = multer({ storage: imageStorage, fileFilter: imageFileFilter});
const excelsheetUpload = multer({ storage: excelStorage, fileFilter: excelFileFilter});

module.exports = {cvUpload, imageUpload, excelsheetUpload};