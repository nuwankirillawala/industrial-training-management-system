// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', name: '', adminRole: '', regNo: ''};

    // handle login errors
    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = "That email is not regitered";
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'This password is incorrect';
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

    return errors;
}

module.exports = handleErrors;