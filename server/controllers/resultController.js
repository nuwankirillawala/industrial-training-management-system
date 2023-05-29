const fs = require('fs');
const { default: mongoose } = require('mongoose');
const path = require('path');
const xlsx = require('xlsx');
const catchAsync = require('../utils/catchAsync');
const Result = require('../models/Result');
const Undergraduate = require('../models/Undergraduate');
const gradeValue = require('../utils/gradeValue')
const setCreditValue = require('../utils/setCreditValue')



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
    const resultJson = xlsx.utils.sheet_to_json(resultSheet, { defval: '' });

    for (const resultData of resultJson) {
      const { name, regNo, ...courses } = resultData;

      // Create an array of objects representing the courses
      const courseArray = Object.entries(courses).map(([courseId, grade]) => ({
        courseId,
        grade: grade || "-"
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


      // calculate weightedGPA based on results

      let totalGradePoints = 0;
      let totalCourseUnits = 0;
      // console.log("$$$$$$$$$$$$$$$$$result.courses", result.courses);

      result.courses && result.courses.forEach((course) => {
        const { grade, courseId } = course;

        const gradePoint = gradeValue(grade);
        // console.log("gradePoint", gradePoint);

        if (gradePoint !== null) {
          const creditValue = setCreditValue(courseId);
          // console.log("creditValue", creditValue);


          totalGradePoints += gradePoint * creditValue;
          totalCourseUnits += creditValue;
        }
      });

      console.log("totalGradePoints", totalGradePoints);
      console.log("totalCourseUnits", totalCourseUnits);

      const weightedGPA = totalGradePoints / totalCourseUnits;
      console.log("weightedGPA", weightedGPA);

      const filter = { regNo: result.regNo };
      const user = await Undergraduate.findOneAndUpdate(filter, { $set: { results: result._id, weightedGPA } }, { session });

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
module.exports.getResults = catchAsync(async (req, res) => {
  try {
    const results = await Result.find();

    if (!results) {
      return res.status(404).json({ error: "results not found" });
    }
    console.log(results);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Method: GET
// Endpoint: "/individual"
// Description: get all results
// User: admin
module.exports.individualResults = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id

    const user = await Undergraduate.findById(userId).select('-password');
    const results = await Result.findById(user.results);

    if (!results) {
      return res.status(404).json({ error: "results not found" });
    }
    console.log(results);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})