// Upper Array
var upperArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
// Lower Array - convert upper array to lower case

// Function to convert text into lower case

// var toLower = function (a) {
// return a.toLowerCase();
// }

// Variable contains function run against upper case array to create lower case array. Map method runs the toLower function against each value in the UpperArr array to create a new lower case array

// var lowerArr = upperArr.map(toLower);

var lowerArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


// Log to test that toLower variable correctly holds lower case values

// console.log(lowerArr);

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

  // Else if statement to run block of code for four affirmative answers from the user; this will assign a values to the undefined variable userChoices. Block of code to be run includes .concat which joins together all of the arrays as per user's selection.

  else if (confirmUpper && confirmLower && confirmNumber && confirmSymbol) {
    userChoices = upperArr.concat(lowerArr, numberArr, symbolArr);
  }
  
  // Else if statement to run block of code for upper, lower and number (3)

  else if (confirmUpper && confirmLower && confirmNumber) {
    userChoices = upperArr.concat(lowerArr, numberArr);
  }

  // Else if statement to run block of code for upper, lower and symbol (3)

  else if (confirmUpper && confirmLower && confirmSymbol) {
    userChoices = upperArr.concat(lowerArr, symbolArr);
  }

  // Else if statement to run block of code for upper, number and symbol (3)

  else if (confirmUpper && confirmNumber && confirmSymbol) {
    userChoices = upperArr.concat(numberArr, symbolArr);
  }

  // Else if statement to run block of code for lower, number and symbol (3)

  else if (confirmLower && confirmNumber && confirmSymbol){
    userChoices = lowerArr.concat(numberArr, symbolArr);
  }

  // Else if statement to run block of code for upper and lower (2)

  else if (confirmUpper && confirmLower) {
    userChoices = upperArr.concat(lowerArr);
  }

  // Else if statement to run block of code for upper and number (2)

  else if (confirmUpper && confirmNumber) {
    userChoices = upperArr.concat(numberArr);
  }

  // Else if statement to run block of code for upper and symbol (2)

  else if (confirmUpper && confirmSymbol) {
    userChoices = upperArr.concat(symbolArr);
  }

  // Else if statement to run block of code for lower and number (2)

  else if (confirmLower && confirmNumber) {
    userChoices = lowerArr.concat(numberArr);
  }

  // Else if statement to run block of code for lower and symbol (2)

  else if (confirmLower && confirmSymbol) {
    userChoices = lowerArr.concat(symbolArr);
  }

  // Else if statement to run block of code for number and symbol (2)

  else if (confirmNumber && confirmSymbol) {
    userChoices = numberArr.concat(symbolArr);
  }

  // Else if statement to run block of code for upper only

  else if (confirmUpper) {
    userChoices = upperArr;
  }

  // Else if statement to run block of code for lower only

  else if (confirmLower) {
    userChoices = lowerArr;
  }

  // Else if statement to run block of code for numbers only

  else if (confirmNumber) {
    userChoices = numberArr;
  }

  // Else if statement to run block of code for symbols only

  else if (confirmSymbol) {
    userChoices = symbolArr;
  };

  var password1 = [];
  
  // For loop to randomly select a value from the relevant array associated with userChoices based on user selection. This loop will end once the total number is reached based on lengthResponse

  for (var i = 0; i < lengthResponse; i++){
    var randomSelection = userChoices[Math.floor(Math.random() * userChoices.length)];
    password1.push(randomSelection);
    
   
    // return password2;

  }

  var password2 = password1.join("");
  // UserInput(password2);
  return password2;
  

}






// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password2 = generatePassword();
  var password2Text = document.querySelector("#password");

  password2Text.value = password2;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
