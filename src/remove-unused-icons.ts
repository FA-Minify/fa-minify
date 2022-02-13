import { RemoveIconsConfig, IconType } from './types';

export function removeUnusedIcons(fileContent: string, config: RemoveIconsConfig) {
  config = config || { usedIcons: {} };
  const usedIcons = config.usedIcons || {};

  // fontawesoms all.js consists of n+1 functions where n=number of different icon styles (far,fas,fal,fab)
  fileContent = fileContent.replace(/(\(function\s*\(\)\s*\{[\s\S.]*?}\(\)\);)/gim, function (func) {

    // get the type ('far'/'fas'/'fal'/'fab') from function
    const matches = /defineIcons\('(fa.)',/gi.exec(func) || [];
    const type = matches[1] as IconType;

    // no type means this function is the bootstrap function
    // keep it
    if (!type) {
      return func;
    }

    if (usedIcons[type] && usedIcons[type]?.length) {
      // we use some icons from this type so we keep this function
      return func;
    }

    // no icons used from this type so remove the function
    return '';
  });

  // we search for the icons object, parse it and remove unused icons
  fileContent = fileContent.replace(/(var\s+icons\s*=)([\s\S.]*?)(;[\s\S.]*?defineIcons\('(fa.)', icons\);)/gmi, function () {
    const fileIcons = arguments[2] as string;
    const type = arguments[4] as IconType;

    // parse the icons object read from the file content
    let iconObject: Record<string, unknown> = {};
    try {
      iconObject = JSON.parse(fileIcons) as { [key: string]: any[] };
    } catch (e) {
      iconObject = {};
    }

    // keep usedIcons and remove every other icon
    if (usedIcons[type]?.length) {
      Object.keys(iconObject).forEach(key => {
        if (usedIcons[type]!.indexOf(key) < 0) {
          delete iconObject[key];
        }
      });
    }

    // return the code without unused icons
    return arguments[1] + JSON.stringify(iconObject) + arguments[3];
  });

  return fileContent;
}
