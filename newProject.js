const inquirer = require('inquirer');
const fs = require('fs');
const moment = require("moment");
const tagsObject = require('./data/tags.json');
const technologyObject = require('./data/technology.json');

const questions = [
  {
    type : "input",
    name : `name`,
    message : "Project Name: ",
    default: "coding",
  },
  {
    type : "input",
    name : `projectLink`,
    message : "Project Link: ",
  },
  {
    type : "input",
    name : `description`,
    message : "Project Description: ",
    default: '',
  },
  {
    type : "list",
    name : `category`,
    message : "Project Category: ",
    choices: ['Personal', 'Work'],
  },
  {
    name: "isOpenSource",
    type: "confirm",
    message: "Is this project open source?",
  },
  {
    name: "sourceCode",
    type: "input",
    message: "Hosted souce code?",
  },
  {
    type : "checkbox",
    name : `tags`,
    message : "Tags: ",
    choices: [...tagsObject, ...technologyObject],
  },
];

function buildPost(answers){
  console.log(answers);
  
  const fileName = `${new Date().toISOString()}.json`;
  
  const fileData = 
  {
    title: answers.name,
    tags: answers.tags,
    openSource: answers.isOpenSource,
    sourceLink: answers.sourceCode,
    projectLink: answers.projectLink,
    description: answers.description,   
    cover: '',
    screenshots: [],
  }
  console.log(fileData)

  const dir = 'content/project'

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  fs.writeFile(`${dir}/${fileName}`, JSON.stringify(fileData), (err) => {
    if (err) throw err;
    console.log('File is created successfully.');
  });
}

function startPompt(){
  inquirer
    .prompt(questions)
    .then(answers => {
      buildPost(answers);
    })
    .catch(error => {
      if(error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
        console.log("error")
      }
    });
}

startPompt()