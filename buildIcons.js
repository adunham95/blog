const fs = require('fs');
const path = require('path');
const glob = require('glob');
const svgr = require("@svgr/core").default;
const tagsObject = require('./data/tags.json');
const technologyObject = require('./data/technology.json');

const icons = glob.sync(`icons/**.svg`);
const tags = [...tagsObject, ...technologyObject]

console.log(tags)

icons.forEach((icon) => {
  const svgCode = fs.readFileSync(icon, 'utf8');
  const iconName = path.parse(icon).name;
  let componentName = "myComponent";
  const tagIndex = tags.findIndex(item => item.icon?.toLowerCase() === iconName);
  
  if(tagIndex >= 0){
      componentName = `${tags[tagIndex].name.replaceAll(' ', '')}Icon`
  }
  if(tagIndex < 0){
      return
    //   componentName = `${iconName.charAt(0).toUpperCase() + iconName.slice(1)}Icon`
  }


  const componentCode = svgr.sync(
    svgCode,
    {
      // Replace dimentions
      svgProps: { height: 32, width: 32, viewBox: '0 0 32 32' },
    },
    { componentName },
  );
//   console.log(componentCode);

  fs.writeFileSync(
    `src/components/Icons/${componentName}.jsx`,
    componentCode
  );
})