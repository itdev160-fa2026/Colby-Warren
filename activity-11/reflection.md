# Activity 11 Reflection: React Tic-Tac-Toe

## Key Learnings
1. **Componet-Based Architecture**

- I learned how to break the game into smaller components like Sqaure, Board, and Game.

- Each component handles its own piece of the UI and logic, which made the code easier to follow.

- I saw how React builds the interface by combining components instead of manually building HTML.

2. **State Management with useState**

- I learned how React's useState manages changing data like the board history and current move.

- When the state updates, React automatically refreshes the UI for the user. 

- This removed the need for direct DOM manipulation like we used in activity-10.

3. **Props for Data Flow**

- I learned how to pass values and functions between components using props.

- This made it clear where data is coming from and how actions update the game.

- It helped me understand React’s one-directional data flow.

4. **Immutability**

- I used .slice() to create new board states instead of modifying arrays directly. 

- I learned that React relies on immutable updates to detect changes.

- This was important for features like move history and time travel. 

## Comparison with Activity 10

| Aspect                | Activity 10 (Vanilla JS) | Activity 11 (React)
|
|---------------------- | ------------------------ | 
---------------------------------------------------| 
| State Updates	        | Manual DOM changes	   | React re-renders automatically
| Code Organization	    | Functions and DOM logic mixed together | Clean components with clear purposes     | Adding Features          | Harder to extend
| Easier because of reusable componets             | Reusability | Not easy to reuse 	               | Components are naturally reusable      | 
| Learning Curve        | Simple JavaScript only   | New ideas like hooks and JSX
| Data Flow             | Spread across events and variables     | Easy to track with props                   | History Feature          | Would be complicated to implement
| Built in through state history                   | UI Synchronization
| Must manage manually  | React keeps UI and state in sync automatically

## Challenges 

1.  **Understanding State Lifting**

- I had to learn why the game’s state needed to live in the parent component.  

- Lifting state up was confusing at first but helped everything stay in sync.

2.  **Immutability**

-  At first, I didn't understand why we couldn't just modify the array directly.

- Now I see it's important for React's change detection.

3.  **JSX Syntax**

-  JSX took some getting used to since it mixes HTML-like syntax with JavaScript.

-  Using className instead of class was new for me. 

- Understanding when to put things inside {} was also an adjustment.

## What Worked Well

1. The move history and time travel feature made more sense once I understood React state. 

2. Components kept everything clean and organized.

3. After understanding useState, the flow of the app felt natural and predictable. 

## Next Steps

Concepts I want to learn more about:

1. **useEffect Hook** - Handling side effects.
2. **Custom Hooks** - Reusing logic across components.
3. **React Router** - Navigating between pages. 
4. **State Management Libraries** - Tools like Redux or Zustand.
5. **Modern Build Tools** - Building full React apps with Vite or CRA.
6. **Component Patterns** - Structuring bigger applications.

## Conclusion

React helped me rebuild my Tic-Tac-Toe game from activity-10 using a much cleaner and more powerful way than vanilla JavaScript. Even though some new concepts were challenging at first, I now have a better understanding on why React is so widely used. The component structure, automatic re-rendering, and clear data flow made the project easier to manage and expand.




