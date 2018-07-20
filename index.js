/**
 * 
 * @param {string} fileContent 
 * @param {{ usedIcons: {far?:string[], fas?:string[], fal?:string[], fab?:string[]}}} config 
 */
module.exports = function (fileContent, config) {
  config = config || {};
  const usedIcons = config.usedIcons || {};

  // fontawesoms all.js consists of n+1 functions where n=number of different icon styles (far,fas,fal,fab)
  fileContent = fileContent.replace(/(\(function\s*\(\)\s*\{[\s\S.]*?}\(\)\);)/gim, function () {
    const func = arguments[1];

    // get the type ('far'/'fas'/'fal'/'fab') from function
    const matches = /\('(fa.)',/gi.exec(arguments[1]) || [];
    const type = matches[1];

    // no type means this function is the bootstrap function
    // keep it
    if (!type) {
      return func;
    }

    if (usedIcons[type] && usedIcons[type].length > 0) {
      // we use some icons from this type so we keep this function
      return func;
    }

    // no icons used from this type so remove the function
    return '';
  });

  // we search for the icons object, parse it and remove unused icons
  fileContent = fileContent.replace(/(var\s+icons\s*=)([\s\S.]*?)(;[\s\S.]*?define\('(fa.)', icons\);)/gmi, function () {
    const icons = arguments[2];
    const type = arguments[4];

    // parse the icons object read from the file content
    let iconObject = null;
    try {
      iconObject = JSON.parse(icons)
    } catch (e) {
      iconObject = {};
    }

    // keep usedIcons and remove every other icon
    if (usedIcons[type]) {
      Object.keys(iconObject).forEach(key => {
        if (!usedIcons[type].includes(key)) {
          delete iconObject[key];
        }
      });
    }

    // return the code without unused icons
    return arguments[1] + JSON.stringify(iconObject) + arguments[3];
  });

  return fileContent;
}