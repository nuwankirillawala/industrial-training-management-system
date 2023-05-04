const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files/CV');
    },
    filename: ((req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)

    })
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/pdf') {
        cb(null, true);
    }
    else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

// const upload = multer({ storage: storage});
const cvUpload = multer({ storage: storage, fileFilter: fileFilter});



module.exports = cvUpload;