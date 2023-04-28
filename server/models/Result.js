const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    name:{type: String},
    regNo:{type: String},
    CSC1113: {type: String},
    CSC1122:{type: String},
    CSC113a:{type: String},
    CSC1142:{type: String},
    CSC1153:{type: String},
    MAT112d:{type: String},
    MAT113d:{type: String},
    AMT112b:{type: String},
    CSC1213:{type: String},
    CSC1223:{type: String},
    CSC1233:{type: String},
    CSC1242:{type: String},
    CSC1251:{type: String},
    MAT121b:{type: String},
    MAT122b:{type: String},
    ENG1201: {type: String}
}) 

const Result = mongoose.model('result', resultSchema);

module.exports = Result;