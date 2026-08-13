# Exercise 13 - React Hook `useEffect`

This project completes all four tasks in the exercise document:

1. Fetch JSONPlaceholder posts and refetch when `userId` changes.
2. Run a countdown timer that stops at zero and cleans up its interval.
3. Track the browser window size and remove the resize listener on unmount.
4. Validate controlled input whenever its value changes.

## Run the project

```powershell
npm install
npm start
```

The posts demo needs an internet connection to reach JSONPlaceholder. The
other three demos work locally.

## Verify the project

```powershell
npm test -- --watchAll=false
npm run build
```
