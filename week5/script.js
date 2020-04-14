// Current date and time

var currentDate = moment();

console.log(currentDate);
console.log("toString() => ${currentDate.toString()}")

$("#currentDay").append(currentDate);