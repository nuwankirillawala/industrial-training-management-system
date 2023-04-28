// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', name: '', adminRole: '', regNo: ''};

    // handle login errors
    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = "The email you entered is not registered..";
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'The password you entered is incorrect.';
    }

    // handle user creation errors
    // duplicate email error
    if (err.code === 11000 && err.keyPattern.email === 1) {
        errors.email = 'This email already registered';
    }

    // duplicate regNo error
    if (err.code === 11000 && err.keyPattern.regNo === 1) {
        errors.regNo = 'This registration number already registered';
    }

    // empty adminRole error
    if (err.message.includes('admin validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // password length error
    if(err.message.includes('password: Minimum password length is 6')){
        errors.password = 'Minimum password length is 6';
    }

    // empty company error  supervisor 
    if(err.message.includes('company: Please enter the company')){
        errors.company = 'Company field is required'
    }

    return errors;
}

module.exports = handleErrors;