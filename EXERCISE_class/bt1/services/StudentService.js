export class StudentService {
    addScores(student, newScores) {
        student.scores = [...student.scores, ...newScores];
    }

    evaluatePerformance(student) {
        return new Promise(resolve => {
            setTimeout(() => {
                const result = student.calculateAverage() > 8
                    ? "Excellent Student"
                    : "Need Improvement";

                resolve(result);
            }, 1000);
        });
    }
}
