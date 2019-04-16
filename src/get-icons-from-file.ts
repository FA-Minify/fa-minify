import { IconType } from './types';

export function getIconsFromFile(fileContent: string) {
  const icons: { [type in IconType]: { [iconName: string]: any } } = {
    fab: {},
    fal: {},
    far: {},
    fas: {}
  };

  // we search for the icons object, parse it and remove unused icons
  fileContent = fileContent.replace(/var\s*icons\s*=([\s\S.]*?);[\s\S.]*?'(fa.)'/gmi, function () {
    const fileIcons = arguments[1];
    const type = arguments[2] as IconType;

    // parse the icons object read from the file content
    let iconObject = null;
    try {
      iconObject = JSON.parse(fileIcons);
    } catch (e) {
      iconObject = {};
    }

    // add file icons to the icon object
    if (icons[type]) {
      Object.keys(iconObject).forEach(key => {
        icons[type][key] = iconObject[key];
      });
    }

    return '';
  });


  // return found icons
  return icons;
};