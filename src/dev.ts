import * as faMinify from './index';
import * as fs from 'fs';

// read file
const content = fs.readFileSync('./all.js').toString();

// get all icons from file
const icons = faMinify.getIconsFromFile(content);

// print file Icons
console.info(JSON.stringify(Object.keys(icons).map(k => {
  return k + ': ' + Object.keys(icons[k]).length + 'icons'
}), null, 2));


// remove all but '.far.fa-cloud'
const clearedContent = faMinify.removeUnusedIcons(content, {
  usedIcons: {
    far: ['cloud']
  }
});

// check if we really removed everything
console.info('\n\ncleared icons: \n', JSON.stringify(faMinify.getIconNamesFromFile(clearedContent), null, 2));

// save to file
fs.writeFileSync('all.cleared.js', clearedContent);