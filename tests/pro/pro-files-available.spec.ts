import * as fs from 'fs';
import { PRO_PATH } from '../constants';

describe('Font-Awesome-Pro available', function () {
  it('should find all.js file', function () {
    const exists = fs.existsSync(PRO_PATH);
    expect(exists).toBe(true);
  });
});
