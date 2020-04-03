// Upper Array
var upperArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
// Lower Array - convert upper array to lower case

// Function to convert text into lower case

var toLower = function (a) {
return a.toLowerCase();
}

// Variable contains function run against upper case array to create lower case array. Map method runs the toLower function against each value in the UpperArr array to create a new lower case array

var lowerArr = upperArr.map(toLower);

// Number Array

var numberArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Symbol Array

var symbolArr = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", " < ", "=", " > ", " ? ", "@", "[", "]", " ^ ", "_", "`", "{", "|", "}", "~"];

// Value of userChoices variable will be defined based on the selection of the user e.g. affirmative for upper and numbers but not for lower and symbols vs affirmative for all criteria. It has therefore been left undefined.

var userChoices;


// Function to randomly select an index from upper array
// Function to randomly select an index from lower array
// Function to randomly select an index from number array
// Function to randomly select an index from symbol array




// Start of generate password function

function generatePassword() {
  
  // Variable to hold the value input by the user in response to password length prompt

  var lengthResponse = parseInt(prompt("How long would you like your password to be (must be between 8 and 128 characters"));

  // If else statements to validate the response given by the user

  if (!lengthResponse) {
    alert("You need to enter a number between 8 and 128")
  }
  

  else if (lengthResponse < 8) {
    alert("Your selected number is too low. Anyone could crack that password!")
  }
  
  else if (lengthResponse > 128) {
    alert("More than 128 characters, seriously?! You're never going to remember that. Try again pal.")
  }

  // Final else statement to cycle through password criteria confirms if the lengthResponse value is valid i.e. a number between 8 and 128

  else {
    var confirmUpper = confirm("Do you want your password to contain uppercase letters?");
    var confirmLower = confirm("Do you want your password to contain lowercase letters?");
    var confirmNumber = confirm("Do you want your password to contain numbers?");
    var confirmSymbol = confirm("Do you want your password to contain symbols?");
  };

  // The following if else statements pertain to all permutations of user choices
  // If statement which runs code to alert the user if they have not answered in the affirmative to any of the confirm messages, so their password cannot be generated
  
  if (!confirmUpper && !confirmLower && !confirmNumber && confirmSymbol) {
    userChoices(alert("You must select one of the options to generate a password"))
  }

  // Else if statement to run block of code for four affirmative answers from the user. Block of code to be run includes .concat which joins together all of the arrays as per user's selection.

  else if (confirmUpper && confirmLower && confirmNumber && confirmSymbol) {
    userChoices = confirmUpper.concat(confirmLower, confirmNumber, confirmSymbol);
  }
  
  // Else if statement to run block of code for upper, lower and number

  else if (confirmUpper && confirmLower && confirmNumber) {
    userChoices = confirmUpper.concat(confirmLower, confirmNumber);
  }

  // Else if statement to run block of code for upper, lower and symbol

  else if (confirmUpper && confirmLower && confirmSymbol) {
    userChoices = confirmUpper.concat(confirmLower, confirmSymbol);
  }

  // Else if statement to run block of code for upper, number and symbol

  else if (confirmUpper && confirmNumber && confirmSymbol) {
    userChoices = confirmUpper.concat(confirmNumber, confirmSymbol);
  }

  // Else if statement to run block of code for lower, number and symbol

  else if (confirmLower && confirmNumber && confirmSymbol){
    userChoices = confirmLower.concat(confirmNumber, confirmSymbol);
  }


}




// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
