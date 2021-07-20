const inquirer = require('inquirer');
const fs = require('fs');
const moment = require("moment");
const someObject = require('./data/tags.json');

const questions = [
  {
    type : "input",
    name : `name`,
    message : "Post Name: ",
    default: "coding",
  },
  {
    type : "input",
    name : `list`,
    message : "Post Category: ",
    choices: ["Programming", "Personal"]
   
  },
  {
    type : "checkbox",
    name : `tags`,
    message : "Tags: ",
    choices: someObject,
  },
];

function buildPost(answers){
  console.log(answers);
  
  const fileName = `${new Date().toISOString()}.md`;

  console.log(fileName);
  
  const fileData = 
`---
title: "${answers.name}"
cover: "8.jpg"
date: "${moment(new Date(), 'YYYY-MM-DD')}"
category: ${answers.category}
tags:
    ${answers.tags.map(t => `- ${t}`).join("\n")}
---
`
  console.log(fileData)
  
  fs.writeFile(`content/${fileName}`, fileData, (err) => {
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