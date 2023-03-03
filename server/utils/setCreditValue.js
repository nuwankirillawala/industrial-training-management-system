const setCreditValue = (courseUnits) => { 
    const creditValueMap = {
        'a': 1.5,
        'α': 1.5,
        'b': 2.5,
        'β': 2.5,
        'd': 1.25,
        'δ': 1.25
    }
    const creditValue = courseUnits.slice(-1);
    return creditValueMap[creditValue] || Number(creditValue);
 }

 module.exports = setCreditValue;