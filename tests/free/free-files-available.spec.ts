import * as fs from 'fs';
import { FREE_PATH } from '../constants';

describe('Font-Awesome-Free available', function () {
  it('should find all.js file', function () {
    const exists = fs.existsSync(FREE_PATH);
    expect(exists).toBe(true);
  });
});