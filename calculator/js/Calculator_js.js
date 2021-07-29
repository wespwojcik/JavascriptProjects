//creates an object to keep track of values
const calculator = {
    //this is displays 0 on the screen
    display_value: '0', 
    //this will hold the first operand for any expressions
    //we set it to null for now
    first_Operand: null,
    //this checks whether or not the second operand 
    //has been input
    wait_second_operand: false , 
    //this will hold the operator, we set it to null for now
    operator: null
};

function input_digit(digit)
{
    const { display_value , wait_second_operand} = calculator;
    //we are checking to see if wait_second_operand is true and
    //set display_value to the key that was clicked.
    if(wait_second_operand === true) {
        calculator.display_value = digit;
        calculator.wait_second_operand = false;
    } else {
        //this overwrites display_value if the current value is 0
        // otherwise it adds onto it
        calculator.display_value = display_value === '0' ? digit: display_value + digit;
    }
}

//this section handles decimal points
function input_decimal(dot) 
{
    //this ensures that accidental clicking of the decimal point
    // doesn't cause bugs in your opperation
    if (calculator.wait_second_operand === true) return;
    if (!calculator.display_value.includes(dot)) {
    // we are saying that if the display_value does not contain a decimal point
    // we want to add a decimal point
    calculator.display_value += dot;
    }
}

//this section handles operators
function handle_operator(next_operator)
{
    const {first_Operand , display_value , operator} = calculator;
    //when an operator key is pressed, we conver the current number
    //displayed on the screen to a number and then store the result in 
    //calulator.first operand if it doesn't already exist
    const value_of_input = parseFloat(display_value);
    //checks if an operator already exists and if wait_second_operand is true,
    //then updates the operator and exits from the function
    if(operator && calculator.wait_second_operand) {
        calculator.operator = next_operator;
        return;
    }
    if(first_Operand == null) {
        calculator.first_Operand = value_of_input;
    } else if(operator) {//checks if an operator already exists
        const value_now = first_Operand || 0 ;
        //if operator exists, property lookup is performed for the operator
        //in the perform_calculation object and the function that matches the operator is executed
        let result = perform_calculation[operator](value_now , value_of_input);
        //here we add a fixed amount of numbers after the decimal
        result = Number(result).toFixed(9)
        //this will remove any trailing 0's
        result = (result *1).toString();
        calculator.display_value = (result);
        calculator.first_Operand - result;

    }
    calculator.wait_second_operand = true;
    calculator.operator = next_operator;
}

const perform_calculation = {
    '/': (first_Operand , second_operand) => first_Operand / second_operand,
    '*': (first_Operand , second_operand) => first_Operand * second_operand,
    '+': (first_Operand , second_operand) => first_Operand + second_operand,
    '-': (first_Operand , second_operand) => first_Operand - second_operand,
    '=': (first_Operand , second_operand) => first_Operand = second_operand,
};

function calculator_reset()
{
    calculator.display_value = '0';
    calculator.first_Operand = null;
    calculator.wait_second_operand = false;
    calculator.operator = null;
}
//this function updates the screen with the contents of display_value
function update_display()
{
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.display_value;
}

update_display();
// this section monitors button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    // the target variable is an object that represents the element
    // that was clicked
    const {target} = event;
    //if the element that was clicked on is not a button, exit the function
    if(!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator'))
    {
        handle_operator(target.value);
        update_display();
        return;
    }
    // ensures that AC clears the numbers from the calculator
    if (target.classList.contains('all-clear'))
    {
        calculator_reset();
        update_display();
        return;
    }

    input_digit(target.value);
    update_display();

})