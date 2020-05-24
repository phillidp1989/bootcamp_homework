// Requiring in npm modules

const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");


// Creating Promise-based version of fs modules

const writeFileAsync = util.promisify(fs.writeFile);


// Function to run if user does not provide a valid response to an input prompt

const validAnswer = async (input) => {
    if (input === "") {
        return "Please provide a valid response"
    }
    return true;
}

// Function to generate README.md file based on user responses

async function readMeGenerator() {

    // Try statement to be tested for errors while code is executed

    try {

        const proceed = await inquirer.prompt({
            type: "list",
            name: "proceed",
            message: "Welcome to the README generator. Would you like to proceed?",
            choices: ["Yes", "No"]
        })

        if (proceed.proceed === "No") {
            console.log("The README generator has been stopped");
            return;
        }

        // Variable to hold inquirer prompt asking user for their GitHub username. An axios call will be made after this question has been answered

        const usernameQuestion = await inquirer.prompt({
            type: "input",
            name: "username",
            message: "What is your GitHub username?",
            validate: validAnswer
        })

        // Declaring variables to hold Github API urls based on user response

        const gitHubAPI = `https://api.github.com/users/${usernameQuestion.username}`;
        const queryUrl = `https://api.github.com/users/${usernameQuestion.username}/repos?per_page=100`


        // Axios calls to GitHub API using deconstruction to hold the data in variable called 'data'

        const { data } = await axios.get(gitHubAPI);
        const repos = await axios.get(queryUrl);
        const repoNames = repos.data.map(function (repo) {
            return repo.name;
        })

        // GitHub repos listed for user to select

        const repoQuestion = await inquirer.prompt({
            type: "list",
            name: "repo",
            message: "What is the name of the GitHub repo that holds your project?",
            choices: repoNames
        })

        // Inquirer questions to create additional README content

        const userResponse = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your name?",
                validate: validAnswer
            },

            {
                type: "input",
                name: "project",
                message: "What is the name of your project?",
                validate: validAnswer

            },

            {
                type: "input",
                name: "description",
                message: "Provide a description of your project",
                validate: validAnswer

            },

            {
                type: "input",
                name: "installation",
                message: "Provide details on how this applicaton is installed",
                validate: validAnswer
            },

            {
                type: "input",
                name: "usage",
                message: "Provide information on usage of this application",
                validate: validAnswer
            },

            {
                type: "list",
                name: "screenshotYN",
                message: "Would you like to include a screenshot of your application in your README?",
                choices: ["Yes", "No"],
            },

            {
                type: "input",
                name: "screenshot",
                message: "Provide a link to a screenshot of your application",
                when: (userResponse) => userResponse.screenshotYN === "Yes",
                validate: validAnswer
            },


            {
                type: "input",
                name: "contribution",
                message: "State if you are open to contributions and what your requirements are for accepting them",
                validate: validAnswer
            },

            {
                type: "input",
                name: "testing",
                message: "Provide details on testing applied to your project",
                validate: validAnswer
            },

        ]);

        if (!data.email) {
            const email = await inquirer.prompt({
                type: "input",
                name: "email",
                message: "Provide a contact email address",
                validate: validAnswer
            })
            data.email = email.email;
        }

        // Declaring variable to hold Shields.io API url

        const shieldsLanguages = `https://img.shields.io/github/languages/top/${usernameQuestion.username}/${repoQuestion.repo}`;
        const shieldsLicense = `https://img.shields.io/github/license/${usernameQuestion.username}/${repoQuestion.repo}?logoColor=%23C2CAE8`


        // Declaring variables to hold the content of the README.md file to be generated - this differs depending on whether the user wants to add a screenshot


        if (userResponse.screenshotYN === "Yes") {
            let readMe = `# ${userResponse.project}\n\n## Description:\n${userResponse.description}\n\n## Table of Contents:\n\nBadges\n\nVisuals\n\nInstallation\n\nUsage\n\nLicense\n\nContributing\n\nTesting\n\nContact\n\n## Badges:\n![Github]${shieldsLanguages}\n\n## Visuals:\n![screenshot](${userResponse.screenshot})\n\n## Installation:\n${userResponse.installation}\n\n## Usage:\n${userResponse.usage}\n\n## License:\n![Github]${shieldsLicense}\n\n## Contributing:\n${userResponse.contribution}\n\n## Testing:\n${userResponse.testing}\n\n## Author:\nName: ${userResponse.name}\n\nGithub Username: ${usernameQuestion.username}\n\nGithub Email Address: ${data.email}\n\n<img src="${data.avatar_url}">`;

            writeFileAsync("README.md", readMe).then(function () {
                console.log("Your README file has been successfully created");
            })
        } else {
            let readMe = `# ${userResponse.project}\n\n## Description:\n${userResponse.description}\n\n##Table of Contents:\n\nBadges\n\nInstallation\n\nUsage\n\nLicense\n\nContributing\n\nTesting\n\nContact\n\n## Badges:\n![Github]${shieldsLanguages}\n\n## Installation:\n${userResponse.installation}\n\n## Usage:\n${userResponse.usage}\n\n## License:\n![Github]${shieldsLicense}\n\n## Contributing:\n${userResponse.contribution}\n\n## Testing:\n${userResponse.testing}\n\n## Author:\nName: ${userResponse.name}\n\nGithub Username: ${usernameQuestion.username}\n\nGithub Email Address: ${data.email}\n\n<img src="${data.avatar_url}">`;

            writeFileAsync("README.md", readMe).then(function () {
                console.log("Your README file has been successfully created");
            })
        }

        // Catch block to handle errors

    } catch (error) {
        console.log(error);
    }
}

// Call main readMeGenerator function

readMeGenerator();




