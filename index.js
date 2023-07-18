// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions = [
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
        type: 'list',
        message: 'what is it\s license?',
        choices: ['MIT License', 'GNU'],
        name: 'license'
      },
      {
        type: 'input',
        message: 'Enter Test insrtuctions',
        name: 'tests'
      },
      {
        type: 'input',
        message: 'Enter GitHub username',
        name: 'username'
      },
      {
        type: 'input',
        message: 'Enter email',
        name: 'email'
      }
];

const fileName = 'test.txt';
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    //test generateMarkdown
    var test = generateMarkdown(data);
    console.log(test);

    fs.writeFile(fileName, JSON.stringify(data.title), (err) =>
      err ? console.log(err) : console.log('Success!')
    );
}

// TODO: Create a function to initialize app
function init() {
    //start up inquirer, then call writeToFile()
    inquirer.prompt(questions)
    .then((data) => {writeToFile(fileName, data)});
}

// Function call to initialize app
init();


