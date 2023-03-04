const Company = require("../models/Company");

// Method = POST
// Endpoint = "/create-company"
// Function = create a company
module.exports.createCompany = async (req, res) => {
    try {
        const { name, email, contactNo, address, internSeats, description, connectedForIntern } = req.body;
        //const {criteria01} = req.body.rating;
        const company = await Company.create({ name, email, contactNo, address, internSeats, description, connectedForIntern });
        res.status(201).json({ company: company._id });
    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
}