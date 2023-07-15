// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Function to ask for additional installation steps
function askForAdditionalSteps(data) {
    return inquirer.prompt([
        {
            type: "confirm",
            name: "addStep",
            message: "Would you like to add another installation step?"
        },
        {
            type: "input",
            name: "nextStep",
            message: "Please provide the next installation instruction.",
            when: (answers) => answers.addStep
        }
    ]).then((answers) => {
        if (answers.addStep) {
            data.installation += "\n" + answers.nextStep;
            return askForAdditionalSteps(data);
        } else {
            return data;
        }
    });
}

// Function to ask questions
function askQuestions() {
    const questionsBeforeInstallation = [
        // ... questions before the installation question
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Please provide a description of your project."
        },
        {
            type: "input",
            name: "installation",
            message: "Please provide installation instructions for your project."
        },
    ];

    const questionsAfterInstallation = [
        // ... questions after the installation question
        {
            type: "input",
            name: "usage",
            message: "Please provide usage information for your project."
        },
        {
            type: "input",
            name: "contribution",
            message: "Please provide contribution guidelines for your project."
        },
        {
            type: "input",
            name: "test",
            message: "Please provide test instructions for your project."
        },
        {
            type: "list",
            name: "license",
            message: "Please select a license for your project.",
            choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3", "None"]
        },
        {
            type: "input",
            name: "github",
            message: "Please provide your GitHub username."
        },
        {
            type: "input",
            name: "email",
            message: "Please provide your email address."
        }
    ];

    return inquirer.prompt(questionsBeforeInstallation)
        .then((data) => {
            return askForAdditionalSteps(data);
        })
        .then((data) => {
            return inquirer.prompt(questionsAfterInstallation)
                .then((moreData) => {
                    return {...data, ...moreData};
                });
        });
}

// TODO: Create an array of questions for user input
// const questions = [
//     {
//         type: "input",
//         name: "title",
//         message: "What is the title of your project?"
//     },
//     {
//         type: "input",
//         name: "description",
//         message: "Please provide a description of your project."
//     },
//     {
//         type: "input",
//         name: "installation",
//         message: "Please provide installation instructions for your project."
//     },
//     {
//         type: "input",
//         name: "usage",
//         message: "Please provide usage information for your project."
//     },
//     {
//         type: "input",
//         name: "contribution",
//         message: "Please provide contribution guidelines for your project."
//     },
//     {
//         type: "input",
//         name: "test",
//         message: "Please provide test instructions for your project."
//     },
//     {
//         type: "list",
//         name: "license",
//         message: "Please select a license for your project.",
//         choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3", "None"]
//     },
//     {
//         type: "input",
//         name: "github",
//         message: "Please provide your GitHub username."
//     },
//     {
//         type: "input",
//         name: "email",
//         message: "Please provide your email address."
//     }
// ];

// Function to ask for additional installation steps
// function askForAdditionalSteps(data) {
//     return inquirer.prompt([
//         {
//             type: "confirm",
//             name: "addStep",
//             message: "Would you like to add another installation step?"
//         },
//         {
//             type: "input",
//             name: "nextStep",
//             message: "Please provide the next installation instruction.",
//             when: (answers) => answers.addStep
//         }
//     ]).then((answers) => {
//         if (answers.addStep) {
//             data.installation += "\n" + answers.nextStep;
//             return askForAdditionalSteps(data);
//         } else {
//             return data;
//         }
//     });
// }

// TODO: Create a function to initialize app
function init() {
    askQuestions()
        .then((data) => {
            const readMeContent = generateMarkdown(data);

            // TODO: Create a function to write README file
            fs.writeFile("README.md", readMeContent, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Success!');
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
}


// Function call to initialize app
init();
