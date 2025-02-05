let displayDiv = document.querySelector("input");
const calculatorBtns = document.querySelectorAll("button");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector("#decimal");

displayDiv.focus();


// Allow only numertic keys
displayDiv.addEventListener("keydown", (event) => {
    // Allowed keys: numbers, operators, and control keys like backspace
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                        '+', '-', '*', '/', '.', 'Backspace', 'Shift', 'Enter',
                         'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
    
    if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
        return false;
    };
});

// function to perform calculations12
function evaluateExpression(expression) {
    const tokens = expression.split(/\s+/);
    let result = parseFloat(tokens[0]);
    // to track if there is a decimal point already present
    let hasDecimal = false;
    // to track if there is an operator already present
    let hasOperator = false;

    for (let i = 1; i < tokens.length; i +=2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]); 

        // configure the operators
        switch (operator) {
            case "+":
                result += nextNumber;
                break;
            case "-":
                result -= nextNumber;
                break;
            case "x" || "*":
                result *= nextNumber;
                break;
            case "÷":
                switch(nextNumber) {
                    case 0:
                    return displayDiv.textContent = 0;
                }
                result /= nextNumber;
                break;
            case "%":
                result = parseFloat(tokens[i - 1]) / 100;
                break;
            default:
                return displayDiv.textContent = 0;
        }

        // check if it contains a decimal point
        if (nextNumber.toString().includes(".")) {
            hasDecimal = true;
        };
        
        // check if it contains an operator
        if(nextNumber.toString().match(/[+\-x÷%]/)) {
            hasOperator = true;
        };
    }
    return result;
}


displayDiv.addEventListener("keypress", (event) => {
    // Check if the pressed key is one of the specified keys
    if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
    // Prevent the default key value from being displayed
    event.preventDefault();

    // assigned values to be displayed
    if (event.key === "+") {
        displayDiv.value += " + "
    } else if (event.key === "-") {
        displayDiv.value += " - ";
    } else if (event.key === "*") {
        displayDiv.value += " x ";
    } else if (event.key === "/") {
        displayDiv.value += " ÷ ";
    };

}});

// compile the display with the buttons
calculatorBtns.forEach((button) => {
    button.addEventListener("click", () => {
    let buttonText = button.textContent;
    if (buttonText === "C") {
        displayDiv.value = "";
    } else if (buttonText === "="){
        const expression = displayDiv.value;
        const result = evaluateExpression(expression);
        displayDiv.value = result;
    } // backspace button to delete a character at a time from the last entry
      else if (buttonText === "←") {
        displayDiv.value = displayDiv.value.slice(0, -1)
    } else {
        displayDiv.value += buttonText;
    }
    });
});

// Enter keypress returns result
displayDiv.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        const expression = displayDiv.value;
        const result = evaluateExpression(expression);
        displayDiv.value = result;
    };
});