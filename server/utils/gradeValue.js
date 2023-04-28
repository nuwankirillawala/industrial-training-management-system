const gradeValue = (grade) => {
    const gradeValueMap = {
        'A+': 9,
        'A': 8,
        'A-': 7,
        'B+': 6,
        'B': 5,
        'B-': 4,
        'C+': 3,
        'C': 2,
        'C-': 1,
        'D+': 1,
        'D': 0,
        'E': 0,
        'MC': 0,
    };

    return gradeValueMap[grade] || null;
 }

module.exports = gradeValue;