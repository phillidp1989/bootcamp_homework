// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Upper Array
var upperArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
// Lower Array
var lowerArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Number Array
var numberArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// Symbol Array


// Function to randomly select an index from upper array
// Function to randomly select an index from lower array
// Function to randomly select an index from number array
// Function to randomly select an index from symbol array

// prompt for password length (string)
// prompt for lower (boolean)
// prompt for upper (boolean)
// prompt for number length
// prompt for symbol length


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
