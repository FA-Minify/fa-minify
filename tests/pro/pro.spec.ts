import * as fs from 'fs';

import { getIconsFromFile } from '../../src/get-icons-from-file';
import { removeUnusedIcons } from '../../src/remove-unused-icons';

describe('Fontawesome Pro', function () {
  const allJSPath = './node_modules/@fortawesome/fontawesome-pro/js/all.js';
  const fileContent = fs.readFileSync(allJSPath, 'utf-8').toString();

  it('should be parseable', function () {
    const icons = getIconsFromFile(fileContent);

    expect(icons).toBeTruthy();

    for (const iconType of ['fab', 'fas', 'far', 'fal']) {
      const iconsByType = icons[iconType];
      expect(iconsByType).toBeTruthy();
      expect(Object.keys(iconsByType).length).toBeGreaterThan(0, 'No Icons found for type: ' + iconType);
    }

  });


  it('should remove icons', function () {
    const before = getIconsFromFile(fileContent);

    expect(before).toBeTruthy();
    expect(before.fas).toBeTruthy();

    // expect to have more than one icon
    expect(Object.keys(before.fas).length).toBeGreaterThan(1);

    // remove all icons but keep "fas-cloud"
    const minifiedContent = removeUnusedIcons(fileContent, { usedIcons: { fas: ['cloud'] } });

    // check if minification was possible
    expect(minifiedContent).toBeTruthy();
    expect(minifiedContent.length).toBeLessThan(fileContent.length);

    // get icons from minified fileContent
    const after = getIconsFromFile(minifiedContent);

    expect(after).toBeTruthy();
    expect(after.fas).toBeTruthy();

    // expect that we removed all but one icon
    expect(Object.keys(after.fas).length).toEqual(1);

  });
});