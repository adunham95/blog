const inquirer = require('inquirer');
const fs = require('fs');
const currentTags = require('./data/tags.json');

const questions = [
  {
    type : "input",
    name : `name`,
    message : "Tag Name: ",
  },
  {
    name: "checked",
    type: "confirm",
    message: "Is this a default tag?",
  },
  {
    type : "input",
    name : `color`,
    message : "Tag Color: ",
  },
];

function buildTag(answers){
  console.log(answers);
  
  const newTags = [...currentTags, answers];
  console.log(newTags)
  
  fs.writeFile(`./data/tags.json`, JSON.stringify(newTags), (err) => {
    if (err) throw err;
    console.log('File updated successfully.');
  });
}

function startPompt(){
  inquirer
    .prompt(questions)
    .then(answers => {
      buildTag(answers);
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