const inquirer = require('inquirer');
const fs = require('fs');
const moment = require("moment");
const tagsObject = require('./data/tags.json');
const technologyObject = require('./data/technology.json');

const questions = [
  {
    type : "input",
    name : `name`,
    message : "Post Name: ",
    default: "coding",
  },
  {
    type : "input",
    name : `category`,
    message : "Post Category: ",
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
  
  const fileName = `${new Date().toISOString()}.md`;

  console.log(fileName);
  
  const fileData = 
`---
draft: true
title: "${answers.name}"
cover: "1.jpg"
date: "${moment(new Date(), 'YYYY-MM-DD')}"
category: ${answers.category}
tags:
    ${answers.tags.map(t => `- ${t}`).join("\n")}
---
`
  console.log(fileData)
  
  const dir = 'content/blog'

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  fs.writeFile(`${dir}/${fileName}`, fileData, (err) => {
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