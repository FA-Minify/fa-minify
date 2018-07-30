import { IconType } from './types';

export function getIconNamesFromFile(fileContent: string) {
  const icons = {
    far: <string[]>[],
    fal: <string[]>[],
    fas: <string[]>[],
    fab: <string[]>[]
  };

  // we search for the icons object, parse it and remove unused icons
  fileContent = fileContent.replace(/(var\s+icons\s*=)([\s\S.]*?)(;[\s\S.]*?define\('(fa.)', icons\);)/gmi, function () {
    const fileIcons = arguments[2];
    const type = arguments[4] as IconType;

    // parse the icons object read from the file content
    let iconObject = null;
    try {
      iconObject = JSON.parse(fileIcons)
    } catch (e) {
      iconObject = {};
    }

    // add file icons to the icon object
    if (icons[type]) {
      Object.keys(iconObject).forEach(key => {
        icons[type].push(key);
      });
    }

    return '';
  });


  // return found icons
  return icons;
};