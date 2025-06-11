export const botMarkdownMessage = `**Currying in JavaScript**

Currying is a process in functional programming that transforms a function with multiple arguments into a sequence of nested functions. Each function takes one argument and returns another function until all arguments have been provided.

**Why Currying?**

- Improves code readability and maintainability
- Enables partial application of functions
- Facilitates function composition

**Basic Currying Example**

\`\`\`javascript
// Uncurried function
function add(a, b, c) {
    return a + b + c;
}

// Curried function
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        }
    }
}

// Usage
console.log(add(1, 2, 3)); // Output: 6
console.log(curriedAdd(1)(2)(3)); // Output: 6
\`\`\`
`;
