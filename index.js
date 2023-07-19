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
        message: 'Any contributions?',
        name: 'contributing'
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
    //store data as independent variables
    const {title, description, installation, usage, license, contributing, tests, username, email} = data;
    let readMe;
    //console.log(data);
    //Sections//////////////////////////////////////////////////
    //Title--------------------
    let titleSect = '';
    if(title === '')  {titleSect = '# <Your-Project-Title>';}
    else {titleSect = `# ${title}`;}
    //Description----------------
    let descriptionSect = '## Description';
    if(description !== '')  {descriptionSect += `\n${description}`;}
    //Table of Contents----------------
    let tableContents = '## Table of Contents';
    if(installation !== '') 
      {tableContents += '\n- [Installation](#installation)';}
    if(usage !== '') 
      {tableContents += '\n- [Usage](#usage)';}
    if(license !== '') 
      {tableContents += '\n- [License](#license)';}
    if(contributing !== '') 
      {tableContents += '\n- [Contributing](#contributing)';}
    if(tests !== '') 
      {tableContents += '\n- [Tests](#tests)';}
    if(username !== '' || email !== '') 
      {tableContents += '\n- [Questions](#questions)';}
    //console.log('table: \n' + tableContents);
    //end of Sections//////////////////////////////////////////////////
    //test generateMarkdown
    var mark = generateMarkdown(license);
    

    //generate file
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


