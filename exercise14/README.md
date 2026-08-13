# Exercise 14 - React Hook `useContext`

This project completes all three requirements in the exercise document:

1. `ThemeContext`, `ThemeProvider`, and a consumer component that toggles the
   supplied light/dark theme.
2. A cart application whose dish list and cart share state through
   `CartContext`.
3. Cart count and total value update immediately whenever an item is added,
   removed, or cleared.

The four dishes use the data supplied by the exercise document. Their visual
category panels are CSS-based, so the project does not depend on missing image
files or external image hosts.

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
