import * as fs from 'fs';

describe('Font-Awesome-Pro available', function () {
  it('should find all.js file', function () {
    const path = './node_modules/@fortawesome/fontawesome-pro/js/all.js';
    const exists = fs.existsSync(path);

    expect(exists).toBe(true);
  });
});

describe('Font-Awesome-Free available', function () {
  it('should find all.js file', function () {
    const path = './node_modules/@fortawesome/fontawesome-free/js/all.js';
    const exists = fs.existsSync(path);

    expect(exists).toBe(true);
  });
});