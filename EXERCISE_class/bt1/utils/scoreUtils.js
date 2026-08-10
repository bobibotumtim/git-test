// Rest Parameter
export function createScores(...scores) {
    return scores;
}

// filter
export function getPassingScores(scores) {
    return scores.filter(score => score >= 5);
}

// map
export function processScores(scores) {
    return scores.map(score => ({
        score,
        result: score >= 5 ? "Pass" : "Fail"
    }));
}

// reduce
export function calculateTotal(scores) {
    return scores.reduce((sum, score) => sum + score, 0);
}
