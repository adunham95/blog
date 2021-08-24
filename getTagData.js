const tagsObject = require('./data/tags.json');
const technologyObject = require('./data/technology.json');

const tags = [...tagsObject, ...technologyObject]

function getBrandColors(){
  const colors = {};
  tags.forEach((icon) => {
    colors[icon.name.replaceAll(' ', '').toLowerCase()] = icon.color
  });
  // console.log(colors)
  return colors;
}

module.exports = { getBrandColors };