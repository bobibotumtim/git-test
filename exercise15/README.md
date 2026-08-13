# Exercise 15 - React Hook `useReducer`

This project completes both tasks in the exercise document:

1. A counter reducer supporting `INCREMENT`, `DECREMENT`, and `RESET` actions.
2. A question bank reducer supporting `SELECT_OPTION`, `NEXT_QUESTION`, and
   `RESTART_QUIZ` actions.

The quiz keeps its question index, selected option, score, and completion state
inside one reducer-managed state object. A score is added only when the user
advances, which prevents repeated selection changes from increasing the score.

## Run the project

```powershell
npm install
npm start
```

## Verify the project

```powershell
npm test -- --watchAll=false
npm run build
```
