const fs = require('fs');
const { default: mongoose } = require('mongoose');
const path = require('path');
const xlsx = require('xlsx');
const catchAsync = require('../utils/catchAsync');
const Result = require('../models/Result');
const Undergraduate = require('../models/Undergraduate');
const { findById } = require('../models/Alumni');

// Method: POST
// Endpoint: "/upload-resultsheet"
// Description: Upload resultsheet and add results of undergraduate
// User: admin
module.exports.uploadResultSheetAndAddResult = catchAsync(async (req, res) => {
  let session;
  try {
    // Get the session and start a transaction
    session = await mongoose.startSession();
    session.startTransaction();

    // Convert the Excel file to a JSON file
    const excelFolder = 'files/excel';
    const files = fs.readdirSync(excelFolder)
      .filter(file => path.extname(file) === '.xlsx')
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(excelFolder, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time);

    if (files.length === 0) {
      return res.status(400).json({ error: 'Excel file not found' });
    }

    // Get the path to the most recently modified Excel file
    const filePath = path.join(excelFolder, files[0].name);

    // Read the Excel file and get the sheet containing the results
    const resultbook = xlsx.readFile(filePath);
    const resultSheet = resultbook.Sheets[resultbook.SheetNames[0]];

    // Convert the sheet to a JSON object
    const resultJson = xlsx.utils.sheet_to_json(resultSheet);

    for (const resultData of resultJson) {
      const { name, regNo, ...courses } = resultData;

      // Create an array of objects representing the courses
      const courseArray = Object.entries(courses).map(([courseId, grade]) => ({
        courseId,
        grade
      }));

      const currentResult = await Result.findOne({ regNo });

      let result;

      if (currentResult) {
        result = await Result.findByIdAndUpdate(currentResult._id, { courses: courseArray, name }, { session })
      }
      else {
        const newResult = new Result({
          name,
          regNo,
          courses: courseArray,
        });

        result = await newResult.save({ session });
      }



      // Get the `Undergraduate` user for the registration number
      const filter = { regNo: result.regNo };
      const user = await Undergraduate.findOneAndUpdate(filter, { $set: { results: result._id } }, { session });

      console.log(`Result saved for ${regNo}`);

      // If the `Undergraduate` user or the `Result` object could not be saved, abort the transaction and return an error
      if (!user || !result) {
        console.log(`Error saving result for ${regNo}`);
        await session.abortTransaction();
        return res.status(400).json({ error: `Error saving result for ${regNo}` });
      }
    }

    // Commit the transaction
    await session.commitTransaction();

    const response = {
      message: 'Successful',
      resultCount: resultJson.length,
    };

    res.status(201).json(response);
  } catch (err) {
    // Abort the transaction
    if (session) {
      await session.abortTransaction();
    }
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // End the session
    if (session) {
      session.endSession();
    }
  }
});


// Method: GET
// Endpoint: "/get-all"
// Description: get all results
// User: admin

module.exports.getResults = catchAsync( async(req, res) => {
  try {
    const results = await Result.find();

    if(!results){
      return res.status(404).json({error: "results not found"});
    }
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})