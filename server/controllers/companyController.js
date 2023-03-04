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

// Method = POST
// Endpoint = "//:companyID/add-contact-person"
// Function = add a contact person for a company
module.exports.addContactPerson = async (req, res) => {
    try {
        const contactPersonData = req.body;
        // Convert the request parameter "companyID" to a MongoDB ObjectID
        const id = mongoose.Types.ObjectId(req.params.companyID);

        Company.findByIdAndUpdate(
            id,
            { $push: { contactPerson: contactPersonData } },
            { new: true },
            (err, updatedCompany) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'An error occurred while updating the company' });
                }

                if (!updatedCompany) {
                    return res.status(404).json({ error: 'The company was not found' });
                }

                res.status(200).json({ message: 'The contact person was added successfully' });
            }
        );

    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

// Method = PATCH
// Endpoint = "/:companyID/edit-rating"
// Function = edit company ratings
module.exports.editCompanyRating = (req, res) => {
    try {
        const companyID = req.params.companyID;
        console.log(companyID);
        const c = Company.find();
        console.log(c)
        // Company.findById(companyID, (err, foundCompany) => {
        //     if(err){
        //         console.log(err);
        //     } else {
        //         console.log(foundCompany);
        //     } 
        // }) 
    } catch (err) {
        console.log(err);
    }
}

//Method: GET
//Endpoint: "/intern-process-company-list"
//Function: View companies that select for intern application process
module.exports.internProcessCompanyList = async (req, res) => {
    try {
        const companyList = await Company.find({ connectedForIntern: false });

        if (companyList.length === 0) {
            return res.status(404).json({ message: "No any company for intern process" });
        }

        res.status(200).json(companyList);
    } catch (err) {
        res.status(500).json(err);
    }
}