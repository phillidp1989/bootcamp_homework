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

var symbolArr = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "\:", "\;", " < ", "=", " > ", " ? ", "@", "[", "\\", "]", " ^ ", "_", "`", "{", "|", "}", "~"];


// Function to randomly select an index from upper array
// Function to randomly select an index from lower array
// Function to randomly select an index from number array
// Function to randomly select an index from symbol array

// prompt for password length (string) - code should validate user input - loop if input is not between 8 and 128
// confirm for lower (boolean)
// confirm for upper (boolean)
// confirm for number (boolean)
// confirm for symbol (boolean)
// code needs to validate that at least one of the above criteria is selected

// Start of generate password function

function generatePassword() {
  var lengthResponse = parseInt(prompt("How long would you like your password to be (must be between 8 and 128 characters"));
  if (!lengthResponse) {
    alert("You need to enter a number between 8 and 128")
  }
  

  else if (lengthResponse < 8) {
    alert("Your selected number is too low. Anyone could crack that password!")
  }
  
  else if (lengthResponse > 128) {
    alert("More than 128 characters, seriously?! You're never going to remember that. Try again pal.")
  }

  else {
    var confirmUpper = confirm("Do you want your password to contain uppercase letters?");
    var confirmLower = confirm("Do you want your password to contain lowercase letters?");
    var confirmNumber = confirm("Do you want your password to contain numbers?");
    var confirmSymbol = confirm("Do you want your password to contain symbols?");
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
