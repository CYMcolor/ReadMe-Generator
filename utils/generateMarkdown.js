let licenseList = [
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
];
let linkList = [
  'https://opensource.org/licenses/MIT', 
  'https://www.gnu.org/licenses/gpl-3.0',
  'https://opensource.org/licenses/Apache-2.0',
  'https://www.boost.org/LICENSE_1_0.txt',
  'https://opensource.org/license/bsd-2-clause/',
  'https://opensource.org/license/BSD-3-clause/',
  'https://creativecommons.org/publicdomain/zero/1.0/',
  'https://www.eclipse.org/legal/epl-2.0/',
  'https://www.gnu.org/licenses/agpl-3.0',
  'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html',
  'https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html',
  'https://opensource.org/licenses/MPL-2.0',
  'https://opensource.org/license/unlicense/',
]
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  const licenseDash = license.replace(/\s/g , "_");
  return `\n[![License: ${license}](https://img.shields.io/badge/License-${licenseDash}-blue.svg)]`
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  var ind = licenseList.indexOf(license);
  var link = linkList[ind];
  return link;
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let badge = renderLicenseBadge(license);
  let link = renderLicenseLink(license);
  licenseSect =`${badge}(${link})`;
  return licenseSect;
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  let markdown = `\n`+ renderLicenseSection(data);
  return markdown;
}

module.exports = generateMarkdown;

