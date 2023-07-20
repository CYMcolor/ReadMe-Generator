// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions = [
  {
      type: 'input',
      message: 'Enter title:',
      name: 'title',
  },
  {
    type: 'input',
    message: 'Enter description:',
    name: 'description',
  },
  {
    type: 'input',
    message: 'Enter installation instructions:',
    name: 'installation',
  },
  {
    type: 'input',
    message: 'Enter it\'s usage:',
    name: 'usage'
  },
  {
    type: 'confirm',
    message: 'Add photo?',
    name: 'photoBool',
  },
  {
    type: 'input',
    message: 'Photo file\'s name (Will refer to assets/images folder):',
    name: 'photoFile',
    when(answers) //only asks if photBool is true
    {
      return answers.photoBool;
    }
  },
  {
    type: 'input',
    message: 'Photo\'s description:',
    name: 'photoDescription',
    when(answers) //only asks if photBool is true
    {
      return answers.photoBool;
    }
  },
  {
    type: 'list',
    message: 'Choose it\'s license?',
    choices: [
      'MIT License', 
      'GNU GPLv3',
      'ApacheLicense 2.0',
      'Boost Software License 1.0',
      'BSD 2-Clause "Simplified" License',
      'BSD 3-Clause "New" or "Revised" License',
      'Creative Commons Zero v1.0 Universal',
      'Eclipse Public License 2.0',
      'GNU AGPLv3',
      'GNU GPLv2',
      'GNU LGPLv2.1',
      'Mozilla Public License 2.0',
      'The Unlicense',
      'none'
    ],
    name: 'license'
  },
  {
    type: 'input',
    message: 'Enter contributions:',
    name: 'contributing'
  },
  {
    type: 'input',
    message: 'Enter test insrtuctions',
    name: 'tests'
  },
  {
    type: 'input',
    message: 'Enter GitHub username:',
    name: 'username'
  },
  {
    type: 'input',
    message: 'Enter email:',
    name: 'email'
  }
];

const fileName = './assets/README.md';
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    //store data as independent variables
    const {title, description, installation, usage, photoBool, license, contributing, tests, username, email} = data;
    //console.log(data);
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
    if(license !== 'none') 
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
    if(usage !== '' || photoBool)  //creates usage section if data or phot was added
    {
      usageSect = `## Usage\n${usage}`;
      if (photoBool) // if said yes to photo
      { 
        // store phot variables
        var {photoFile, photoDescription} = data;
        // if file is blank
        if(photoFile != '')
        {
          // if decription is blank default to 'screenshot'
          if(photoDescription == '')
            photoDescription = 'screenshot';
          //add photo string
          usageSect += `\n![${photoDescription}](./assets/images/${photoFile})`;
        }   
      }
    }
    //License---------------------------
    let licenseSect = '';
    if(license !== 'none')  
    { 
      licenseSect = generateMarkdown(license);
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
        questionsSect += `\nGitHub profile: https://github.com/${username}\n`;
      }
      if(email !== '' )
      {
        questionsSect += `\nEmail: ${email}\n`;
      }
    }
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
    finalSections.forEach(sect => readMe += `\n${sect}\n`);
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


