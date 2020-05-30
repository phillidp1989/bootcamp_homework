// Requiring in npm modules

const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const validation = require("./validation");


// Creating Promise-based version of fs modules

const writeFileAsync = util.promisify(fs.writeFile);


// Function to generate README.md file based on user responses

async function readMeGenerator() {

    // Try statement to be tested for errors while code is executed

    try {

        const proceed = await inquirer.prompt({
            type: "list",
            name: "continue",
            message: "Welcome to the README generator. Would you like to proceed?",
            choices: ["Yes", "No"]
        });

        if (proceed.continue === "No") {
            console.log("The README generator has been stopped");
            return;
        }

        // Variable to hold inquirer prompt asking user for their GitHub username. An axios call will be made after this question has been answered

        const usernameQuestion = await inquirer.prompt({
            type: "input",
            name: "username",
            message: "What is your GitHub username?",
            validate: validation.validAnswer
        });

        // Declaring variables to hold Github API urls based on user response

        const gitHubAPI = `https://api.github.com/users/${usernameQuestion.username}`;
        const queryUrl = `https://api.github.com/users/${usernameQuestion.username}/repos?per_page=100`;


        // Axios calls to GitHub API using deconstruction to hold the data in variable called 'data'

        const { data } = await axios.get(gitHubAPI);
        const repos = await axios.get(queryUrl);
        const repoNames = repos.data.map(repo => repo.name);

        // GitHub repos listed for user to select

        const repoQuestion = await inquirer.prompt({
            type: "list",
            name: "repo",
            message: "What is the name of the GitHub repo that holds your project?",
            choices: repoNames
        });

        // Inquirer questions to create additional README content

        const userResponse = await inquirer.prompt([

            {
                type: "input",
                name: "description",
                message: "Provide a description of your project",
                validate: validation.validAnswer

            },

            {
                type: "input",
                name: "installation",
                message: "Provide details on how this applicaton is installed",
                validate: validation.validAnswer
            },

            {
                type: "input",
                name: "usage",
                message: "Provide information on usage of this application",
                validate: validation.validAnswer
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
                validate: validation.urlValidator
            },


            {
                type: "input",
                name: "contribution",
                message: "State if you are open to contributions and what your requirements are for accepting them",
                validate: validation.validAnswer
            },

            {
                type: "input",
                name: "testing",
                message: "Provide details on testing applied to your project",
                validate: validation.validAnswer
            },

            {
                type: "input",
                name: "filename",
                message: "Provide a filename for your new README document",
                validate: validation.validAnswer
            }

        ]);

        // Conditional prompt invoked if the user has chosen a filename which already exists

        if (fs.existsSync(`./${userResponse.filename}.md`)) {
            const { updateFileName } = await inquirer.prompt({
                type: "input",
                message: `A file named ${userResponse.filename} already exists within this directory. Please provide an alternative filename so that the original document is not overwritten`,
                name: "updateFileName",
                validate: validation.validAnswer
            });
            userResponse.filename = updateFileName;
        }

        // Follow up question which is only invoked if email address is not available from GitHub API response

        if (!data.email) {
            const email = await inquirer.prompt({
                type: "input",
                name: "contact",
                message: "Your email address is not available via GitHub, please provide a contact email address",
                validate: validation.emailValidator
            });
            data.email = email.contact;
        }

        // Declaring variable to hold Shields.io API url

        const shieldsLanguages = `https://img.shields.io/github/languages/top/${usernameQuestion.username}/${repoQuestion.repo}`;
        const shieldsLicense = `https://img.shields.io/github/license/${usernameQuestion.username}/${repoQuestion.repo}?logoColor=%23C2CAE8`;
       

        // Declaring variables to hold the content of the README.md file to be generated - this differs depending on whether the user wants to add a screenshot


        if (userResponse.screenshotYN === "Yes") {
            const readMe = `# ${repoQuestion.repo}\n\n## Table of Contents:\n\n1. [Description](#description)\n\n2. [Visuals](#visuals)\n\n3. [Installation](#installation)\n\n4. [Usage](#usage)\n\n5. [License](#license)\n\n6. [Contributing](#contributing)\n\n7. [Testing](#testing)\n\n8. [Languages](#languages)\n\n 9. [Author](#author)\n\n## Description:\n${userResponse.description}\n\n## Visuals:\n![screenshot](${userResponse.screenshot})\n\n## Installation:\n${userResponse.installation}\n\n## Usage:\n${userResponse.usage}\n\n## License:\n<img src="${shieldsLicense}">\n\n## Contributing:\n${userResponse.contribution}\n\n## Testing:\n${userResponse.testing}\n\n## Languages:\n<img src="${shieldsLanguages}">\n\n## Author:\nName: ${data.name}\n\nGithub Username: ${usernameQuestion.username}\n\nGithub Email Address: ${data.email}\n\n<img src="${data.avatar_url}">`;

            await writeFileAsync(`${userResponse.filename}.md`, readMe);
            console.log("Your README file has been successfully created");

        } else {
            const readMe = `# ${repoQuestion.repo}\n\n## Table of Contents:\n\n1. [Description](#description)\n\n2. [Installation](#installation)\n\n3. [Usage](#usage)\n\n4. [License](#license)\n\n5. [Contributing](#contributing)\n\n6. [Testing](#testing)\n\n7. [Languages](#languages)\n\n8. [Author](#author)\n\n## Description:\n${userResponse.description}\n\n## Installation:\n${userResponse.installation}\n\n## Usage:\n${userResponse.usage}\n\n## License:\n<img src="${shieldsLicense}">\n\n## Contributing:\n${userResponse.contribution}\n\n## Testing:\n${userResponse.testing}\n\n## Languages:\n!<img src="${shieldsLanguages}">\n\n## Author:\nName: ${data.name}\n\nGithub Username: ${usernameQuestion.username}\n\nGithub Email Address: ${data.email}\n\n<img src="${data.avatar_url}">`;

            await writeFileAsync(`${userResponse.filename}.md`, readMe);
            console.log("Your README file has been successfully created");
        }

        // Catch block to handle errors

    } catch (error) {
        console.log(error);
    };
};

// Call main readMeGenerator function

readMeGenerator();




