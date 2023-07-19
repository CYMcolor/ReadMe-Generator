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
        type: 'confirm',
        message: 'Add photo?',
        name: 'photoBool',
      },
      {
        type: 'input',
        message: 'Photo file\'s name (Will refer to assets/images folder)',
        name: 'photoFile',
        when(answers) //only asks if photBool is true
        {
          return answers.photoBool;
        }
      },
      {
        type: 'input',
        message: 'Photo\'s description',
        name: 'photoDescription',
        when(answers) //only asks if photBool is true
        {
          return answers.photoBool;
        }
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

const fileName = 'README.md';
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    //store data as independent variables
    const {title, description, installation, usage, photoBool, license, contributing, tests, username, email} = data;
    console.log(data);
    //Sections//////////////////////////////////////////////////
    //Title--------------------
    let titleSect = '';
    if(title === '')  {titleSect = '# <Your-Project-Title>';}
    else {titleSect = `# ${title}`;}
    //Description-----------------
    let descriptionSect = '';
    if(description !== '')  {descriptionSect = `## Description\n${description}`;}
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
    //Installation---------------------------
    let installationSect = '';
    if(installation !== '')  {installationSect = `## Installation\n${installation}`;}
    //Usage---------------------------
    let usageSect = '';
    if(usage !== '' || photoBool)  
    {
      usageSect = `## Usage\n${usage}`;
      if (photoBool) 
      {
         const {photoFile, photoDescription} = data;

         usageSect += `\n![${photoDescription}](./assets/images/${photoFile})`;
      }
    }
    //License---------------------------
    let licenseSect = '';
    if(license !== '')  
    { 
      licenseSect = `## License\n${license}`;
      //call generateMarkdown
      var mark = generateMarkdown(license);
    }
    //Contributing---------------------------
    let contributingSect = '';
    if(contributing !== '')  {contributingSect = `## Contributing\n${contributing}`;}
    //Tests----------------------
    let testsSect = '';
    if(tests !== '')  {testsSect= `## Tests\n${tests}`;}
    //Questions-----------------
    let questionsSect = '';
    if(username !== '' || email !== '')   
    {
      questionsSect = `## Questions`;
      if(username !== '' )
      {
        questionsSect += `\nGitHub profile: https://github.com/${username}`;
      }
      if(email !== '' )
      {
        questionsSect += `\nEmail: ${email}`;
      }
    }
    //console.log('questions: \n' + questionsSect);
    //end of Sections//////////////////////////////////////////////////
    //put all sections in array
    let sections = [
      titleSect,
      descriptionSect,
      tableContents,
      installationSect,
      usageSect,
      licenseSect,
      contributingSect,
      testsSect,
      questionsSect
    ];
    
    //remove all empty sections
    let finalSections = sections.filter(function(item) {return item.trim() != '';})
    //console.log(finalSections);
    let readMe =``;
    finalSections.forEach(sec => readMe += `\n${sec}\n`);
    //generate file
    fs.writeFile(fileName, readMe, (err) =>
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


