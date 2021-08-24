const fs = require('fs');
const path = require('path');
const glob = require('glob');
const svgr = require("@svgr/core").default;
const tagsObject = require('./data/tags.json');
const technologyObject = require('./data/technology.json');

const icons = glob.sync(`icons/**.svg`);
const tags = [...tagsObject, ...technologyObject]

console.log(tags);

const iconComponentTemplate = (
  { template },
  opts,
  { imports, componentName, jsx }
) =>
  template.ast`
        ${imports}
        ${'\n'}
        export const ${componentName} = (width="50px", height="50px"}) => ${jsx};
    `;

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

  let componentCode = svgr.sync(
    svgCode,
    {
      icon: true,
      // Replace dimentions
      svgProps: { height: 50, width: 50, className: `text-brand-${tags[tagIndex].name.replaceAll(' ', '').toLowerCase()} fill-current`},
    },
    { componentName },
  );

  componentCode = componentCode.replace(`className="text-brand-${tags[tagIndex].name.replaceAll(' ', '').toLowerCase()} fill-current"`, `className={\`text-brand-${tags[tagIndex].name.replaceAll(' ', '').toLowerCase()} fill-current \${props.className}\`}`).replace(" {...props}", "")
//   console.log(componentCode);

  fs.writeFileSync(
    `src/components/Icons/${componentName}.jsx`,
    componentCode
  );
})