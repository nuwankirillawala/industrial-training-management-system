// Quick sort algorithm for sort interns according to their weighted GPA 
const quickSortByWGPA = (candidates) => {
    if(candidates.length <= 1){
        return candidates;
    }

    const pivotIndex = Math.floor(candidates.length /2);
    const pivotWGPA = Number(candidates[pivotIndex].weightedGPA);

    const left = [];
    const right = [];

    for(let i = 0; i< candidates.length; i++){
        if(i === pivotIndex){
            continue;
        }

        if(Number(candidates[i].weightedGPA) > pivotWGPA){
            left.push(candidates[i]);
        } else {
            right.push(candidates[i]);
        }
    }
    
    return [...quickSortByWGPA(left), candidates[pivotIndex], ...quickSortByWGPA(right)];
}

module.exports = quickSortByWGPA;