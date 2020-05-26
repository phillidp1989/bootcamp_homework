// Function to run if user does not provide a valid response to an input prompt

const validAnswer = input => {
    if (input === "") {
        return "Please provide a valid response"
    }
    return true;
}

// Validation of screenshot url using regex

const urlValidator = url => {
    const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (urlRegex.test(url) === false) {
        return "Please provide a valid url to your screenshot or gif";
    }
    return true;
}

// Validation of email using regex

const emailValidator = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) === false) {
        return "Please enter a valid email address";
    }
    return true;
}

module.exports = {
    validAnswer: validAnswer,
    urlValidator: urlValidator,
    emailValidator: emailValidator
}