// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const markdown = require('./utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions = [
    
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {

    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title',
          },
          {
            type: 'input',
            message: 'What is it\'s description?',
            name: 'description',
          },
          {
            type: 'input',
            message: 'Installation instructions?',
            name: 'installation',
          },
          {
            type: 'input',
            message: 'What is it\'s usage?',
            name: 'usage'
          },
          {
            type: 'input',
            message: 'How can you test it?',
            name: 'tests'
          }
    
    ])
}

// Function call to initialize app
init();
