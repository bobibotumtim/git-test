import { Student } from "./models/Student.js";
import { StudentService } from "./services/StudentService.js";
import {
    createScores,
    getPassingScores,
    processScores,
    calculateTotal
} from "./utils/scoreUtils.js";

const student = new Student("Dat", 21, createScores(8, 9, 10));
const studentService = new StudentService();

console.log(student.introduce());

// Destructuring
const { name, age } = student;
console.log("Name:", name);
console.log("Age:", age);

// Spread Operator
studentService.addScores(student, [7, 9]);

// Array Methods
const passingScores = getPassingScores(student.scores);
const processedScores = processScores(student.scores);
const totalScore = calculateTotal(student.scores);

console.log("Passing scores:", passingScores);
console.log("Processed scores:", processedScores);
console.log("Total score:", totalScore);
console.log("Student information:", student.displayInfo());

// Promise
studentService.evaluatePerformance(student).then(result => {
    console.log("Evaluation:", result);
});
