import * as fs from 'fs';

import { getIconsFromFile } from '../../src/get-icons-from-file';
import { removeUnusedIcons } from '../../src/remove-unused-icons';
import { IconType } from '../../src/types';
import { FREE_PATH } from '../constants';

describe('Fontawesome Free', function () {
  const fileContent = fs.readFileSync(FREE_PATH, 'utf-8').toString();

  it('should be parseable', function () {
    const icons = getIconsFromFile(fileContent);

    expect(icons).toBeTruthy();
    const types: Array<IconType> = ['fab', 'fas', 'far'/*, 'fal'*/]; // There is no `fal` in the free version
    for (const iconType of types) {
      const iconsByType = icons[iconType];
      expect(iconsByType).toBeTruthy();
      expect(Object.keys(iconsByType).length).toBeGreaterThan(0);
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